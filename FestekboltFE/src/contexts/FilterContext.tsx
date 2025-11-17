import { createContext, useContext, useEffect, useReducer } from "react"

type Filters = {
    min: number | null
    max: number | null
    byName: string
    nameInput: string
    byType: Set<string>
    byAvailability: Set<boolean>
}

export type FiltersContextValue = {
    // az aktuális szűrő állapot (összes mezővel)
    filters: Filters;
  
    // a szűrés eredménye (a szűrt festékek listája)
    //filteredPaints: Paint[];
  
    // műveletek a szűrő módosítására
    setRange: (min: number | null, max: number | null) => void;
    setTypes: (types: Set<string>) => void;
    setAvailability: (availability: Set<boolean>) => void;
    setNameInput: (value: string) => void;
    commitName: () => void;
    reset: () => void;
  };


const initialFilters: Filters = {
    min: null,
    max: null,
    byName: "",
    nameInput: "",
    byType: new Set<string>(),
    byAvailability: new Set<boolean>()
}

export type FilterActions =
    | {type : "setRange"; min: number|null, max:number | null}
    | {type : "setTypes"; types: Set<string> }
    | {type : "setAvailability"; availability: Set<boolean>}
    | {type : "setNameInput"; value: string}
    | {type : "commitName"}
    | {type : "reset"}

const FiltersContext = createContext<FiltersContextValue | null>(null);

function reducer(state: Filters, action:FilterActions){
    switch(action.type){
        case "setRange" :
            return{
                ...state,
                min : action.min,
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

export const FiltersProvider = ({children, maxPrice} : {children:React.ReactNode, maxPrice: number| null}) =>{
    const [filters, dispatch] = useReducer(reducer, initialFilters,(initial)=>{
        const saved = localStorage.getItem("filterState")
        const base: Filters = saved ? JSON.parse(saved) : initial;

        return{
            ...base,
            max: base.max ?? maxPrice ?? null
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

    const setRange = (min: number | null, max: number | null) => {
        dispatch({type:"setRange", min, max})
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
    const commitName = () => {
        dispatch({type: "commitName"})
    }
    const reset = () => {
        dispatch({type : "reset"})
    }

    const value = {
        filters,
        setRange,
        setTypes,
        setAvailability,
        setNameInput,
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