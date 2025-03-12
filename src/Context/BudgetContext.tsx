import { useReducer , createContext ,Dispatch, ReactNode, useMemo } from "react"
import { budgetReducer , initialState , BudgetState, BudgetActions } from "../Reducers/budget-reducer"


//Definiendo los props del Context
type BudgetContextProps = {
        state:BudgetState
        dispatch:Dispatch<BudgetActions>,
        totalExpenses:number,
        remainingBudget:number
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
        const  totalExpenses= useMemo(()=> state.expenses.reduce((total, expense)=>expense.amount+total,0) ,[state.expenses])
         const remainingBudget=state.budget - totalExpenses;

    return (
            <BudgetContext.Provider
                value={{
                    state,
                    dispatch,
                    totalExpenses,
                    remainingBudget
                }}
            >
                {children}
            </BudgetContext.Provider>

    )
}