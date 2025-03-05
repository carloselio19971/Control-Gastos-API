import { useReducer , createContext ,Dispatch, ReactNode } from "react"
import { budgetReducer , initialState , BudgetState, BudgetActions } from "../Reducers/budget-reducer"


//Definiendo los props del Context
type BudgetContextProps = {
        state:BudgetState
        dispatch:Dispatch<BudgetActions>
}   

type BudgetProviderProps={
    children:ReactNode
}

//Accion de Tener el Estado Global
                                                            //Hace que react confie  y sepa que le vamos a pasar correctamente el state y dispatch
export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps);

//Datos que va tener el Context 
// Provider (De donde vienen los datos ) => vienen del Reducer
export const BudgetProvider = ({children}:BudgetProviderProps) => {

        const [state, dispatch] = useReducer(budgetReducer, initialState)

    return (
            <BudgetContext.Provider
                value={{
                    state,
                    dispatch
                }}
            >
                {children}
            </BudgetContext.Provider>

    )
}