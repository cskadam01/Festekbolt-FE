import { createContext, useContext, useEffect, useReducer, useMemo } from "react"
import type { Paint } from "../pages/home/Home";
import { usePaints } from "./GetPaintContext";

type Filters = {
    min: number | null
    max: number | null
    byName: string
    nameInput: string
    byType: Set<string>
    byAvailability: Set<boolean>
    isDragging: boolean
}

export type FiltersContextValue = {
    // az aktuális szűrő állapot (összes mezővel)
    filters: Filters;
  
    // a szűrés eredménye (a szűrt festékek listája)
    //filteredPaints: Paint[];
  
    // műveletek a szűrő módosítására
    setMin: (min: number | null) => void;
    setMax: (max: number | null) => void;
    setTypes: (types: Set<string>) => void;
    setAvailability: (availability: Set<boolean>) => void;
    setNameInput: (value: string) => void;
    setIsDragging: (isDragging: boolean) => void;
    commitName: () => void;
    reset: () => void;

    filteredPaints: Paint[];
    showClearButton: boolean;
  };

const initialFilters: Filters = {
    min: null,
    max: null,
    byName: "",
    nameInput: "",
    byType: new Set<string>(),
    byAvailability: new Set<boolean>(),
    isDragging: false
}

export type FilterActions =
    | {type : "setMin"; min: number | null}
    | {type : "setMax"; max: number | null}
    | {type : "setTypes"; types: Set<string> }
    | {type : "setAvailability"; availability: Set<boolean>}
    | {type : "setNameInput"; value: string}
    | {type : "setIsDragging"; isDragging: boolean}
    | {type : "commitName"}
    | {type : "reset"}

const FiltersContext = createContext<FiltersContextValue | null>(null);

function reducer(state: Filters, action:FilterActions){
    switch(action.type){
        case "setMin" :
            return{
                ...state,
                min : action.min
            }
        case "setMax" :
            return{
                ...state,
                max : action.max
            }
        case "setTypes" : 

            return {...state, byType : new Set(action.types)}
        case "setAvailability" : 

            return{...state, byAvailability : new Set(action.availability)}
        case "setNameInput":
            return {
                  ...state,
                  nameInput: action.value    
                }; 
        case "setIsDragging":
            return{
                ...state,
                isDragging : action.isDragging
            }
        case "commitName":
            return{...state, byName : state.nameInput}
        case "reset":
            return{
                ...initialFilters
            }
        default:
            return state
   }
}

export const FiltersProvider = ({children, maxPrice, minPrice} : {children:React.ReactNode, maxPrice: number| null, minPrice: number | null}) =>{
    
    const { paints, setVisiblePaints } = usePaints();

    const [filters, dispatch] = useReducer(reducer, initialFilters,(initial)=>{
        const saved = localStorage.getItem("filterState")
        const base: Filters = saved ? JSON.parse(saved) : initial;

        return{
            ...base,
            max: maxPrice,
            min: minPrice,
            byType: new Set(base.byType), // Array -> Set
            byAvailability: new Set(base.byAvailability) // Array -> Set
        }

    })

    useEffect(() => {
        const persist = {
          ...filters,
          byType: Array.from(filters.byType),                // Set -> Array
          byAvailability: Array.from(filters.byAvailability) // Set -> Array
        };
        localStorage.setItem("filterState", JSON.stringify(persist));
      }, [filters]);

    useEffect(() => {
        if (minPrice !== null && maxPrice !== null) {
                dispatch({ type: "setMin", min: minPrice });
                dispatch({ type: "setMax", max: maxPrice });
            }
    }, [minPrice, maxPrice]);

    const filteredPaints = useMemo(() => {
    return paints.filter((p) => {
        const price = Number(p.ar);
        if (filters.min == null || filters.max == null) return true;

        const passesPrice = price >= filters.min && price <= filters.max;
        const passesType = filters.byType.size === 0 || filters.byType.has(p.tipus);
        const passesAvailability =
            filters.byAvailability.size === 0 || filters.byAvailability.has(p.raktaron);
        const passesName =
            filters.byName === "" ||
            p.termek_nev.toLowerCase().includes(filters.byName.toLowerCase());

        return passesPrice && passesType && passesAvailability && passesName;
        });
    }, [paints, filters]);

    const showClearButton = useMemo(() => {
        const isMinPriceActive = filters.min !== null && filters.min > (minPrice ?? 0);
        const isMaxPriceActive = filters.max !== null && filters.max < (maxPrice ?? Infinity);
        const isTypeActive = filters.byType.size > 0;
        const isAvailabilityActive = filters.byAvailability.size > 0;
        const isNameActive = filters.byName !== "";
        return isMinPriceActive || isMaxPriceActive || isTypeActive || isAvailabilityActive || isNameActive;
    }, [filters, minPrice, maxPrice]);

    useEffect(() => {
        setVisiblePaints(filteredPaints);
    }, [filters.isDragging, paints, filters.byType, filters.byAvailability, filters.byName]);

    const setMin = (min: number | null) => {
        dispatch({type: "setMin", min})
    }

    const setMax = (max: number | null) => {
        dispatch({type: "setMax", max})
    }

    const setTypes = (types : Set<string>) =>{
        dispatch({type: "setTypes", types })
    }
    const setAvailability = (availability: Set<boolean>) => {
        dispatch({ type: "setAvailability", availability });
      };
    const setNameInput = (value : string) => {
        dispatch({type : "setNameInput", value})
    }
    const setIsDragging = (isDragging: boolean) => {
        dispatch({type : "setIsDragging", isDragging})
    }
    const commitName = () => {
        dispatch({type: "commitName"})
    }
    const reset = () => {
        dispatch({type : "reset"})
        dispatch({ type: "setMin", min: minPrice });
        dispatch({ type: "setMax", max: maxPrice });
    }

    const value = {
        filters,
        filteredPaints,
        showClearButton,
        setMin,
        setMax,
        setTypes,
        setAvailability,
        setNameInput,
        setIsDragging,
        commitName,
        reset
    }

    return(
        <FiltersContext.Provider value={value}>
            {children}
        </FiltersContext.Provider>

    )
}

export function useFilter() {
    const ctx = useContext(FiltersContext)
    if(!ctx){
        throw new Error ("useFilter csak a FilterProvideren belül használható")
    }
    return ctx
}