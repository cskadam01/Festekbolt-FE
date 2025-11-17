
import { createContext, useReducer, useEffect, useContext, useState } from "react";
import type { Paint } from "../pages/home/Home";
import axios from "axios";

// definiáljuk az állapot típusát, ami a festékek listáját tartalmazza
interface PaintsState {
  paints: Paint[];
}

// definiáljuk mit fog tartalmazni a context, vagyis mi lesz elérhető bárhonnan
interface PaintsContextValue {
  paints: Paint[];
  isLoading : boolean;
  error : string | null;
  setPaints: (paints: Paint[]) => void;
}

// kezdeti állapot, üres festéklista
const initialState: PaintsState = {
  paints: [],
};

// létrehozzuk a contextet, ami majd megosztja az adatokat a komponensek között
const PaintsContext = createContext<PaintsContextValue | null>(null);

// reducer action típusa, egyelőre csak a festéklista beállítására szolgál
type PaintsAction = {
  type: "SET_PAINTS";
  payload: Paint[];
};

// reducer függvény, ami a dispatch hívások alapján módosítja az állapotot
function paintsReducer(state: PaintsState, actions: PaintsAction): PaintsState {
  switch (actions.type) {
    case "SET_PAINTS":
      return {
        ...state,
        paints: actions.payload,
      };
    default:
      return state;
  }
}

// provider komponens, ami körülveszi az egész appot és elérhetővé teszi a contextet
export function PaintsProvider({ children }: { children: React.ReactNode }) {
  // létrehozzuk az állapotot és a dispatch-et a reducer segítségével
  const [state, dispatch] = useReducer(paintsReducer, initialState);


  const [isLoading, setIsLoading ] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // az api lekérés itt történik, csak egyszer fut le amikor a provider betölt
  useEffect(() => {
    const paintCall = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/cskadam01/festek-api/refs/heads/main/festek.json"
        );
        setPaints(response.data);
      } catch (e:any) {
        setError(e?.message ?? "Ismeretlen hiba")

      }
      finally{
        setIsLoading(false)

      }
    };

    paintCall();
  }, []);

  // függvény, ami reduceren keresztül beállítja az új festékeket
  function setPaints(paints: Paint[]) {
    dispatch({ type: "SET_PAINTS", payload: paints });
  }

  // a context által megosztott értékek (az állapot és a setter függvény)
  const value: PaintsContextValue = {
    paints: state.paints,
    isLoading,
    error,
    setPaints,
  };

  // visszaadjuk a providert, hogy a gyerek komponensek hozzáférjenek a festékekhez
  return (
    
    <PaintsContext.Provider value={value}>
      {children}
    </PaintsContext.Provider>
  );
}

// saját hook a context egyszerűbb eléréséhez
export function usePaints() {
  const ctx = useContext(PaintsContext);
  if (!ctx)
    throw new Error("usePaints csak a PaintsProvider-en belül használható");
  return ctx;
}
