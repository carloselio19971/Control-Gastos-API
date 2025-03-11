import { categories } from "../Data/categories"
import type { DraftExpense, Value } from "../Types";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import React, { ChangeEvent, useEffect, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../Hooks/useBudget";


export const ExpenseForm = () => {

  const [expense, setExpense] = useState<DraftExpense>({
        amount:0,
        expenseName:'',
        category:'',
        date: new Date()
  })

  const [error, setError] = useState('');
  const { dispatch , state} = useBudget();


  useEffect(()=>{
      if(state.editingId){
            const editingExpenses= state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpenses);
      }
  },[state.editingId]);

  const handleChangeDate = (value:Value) =>{
      setExpense({
        ...expense,
        date:value
      })
  }

  const handleSubmit =( e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      //Validar
      if(Object.values(expense).includes('')){
          setError('Todos los campos son Obligatorios');
            return;
      }
      //Agregar un nuevo Gastos
      dispatch({type:'add-expense',payload:{expense}
      })

      //Reiniciar el State
      setExpense({
            amount:0,
            expenseName:'',
            category:'',
            date: new Date() 
      }
      )



  }
    

  const handleChange = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) =>{

        const {name, value} = e.target
        const isAmountField = ['amount'].includes(name);
        setExpense({
          ...expense,
          [name]: isAmountField ?  Number(value): value
        })

      }

  return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend
                    className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
            > Nuevo Gasto</legend>
            {error &&  <ErrorMessage>{error}</ErrorMessage>}

             {/* Campo para el nombre del Gasto*/}
            <div className="flex flex-col gap-2">
                  <label
                  htmlFor="expenseName"
                  className="text-xl"
                  >Nombre Gasto:</label>
                  <input
                  type="text"
                  id="expenseName"
                  placeholder="Añade el nombre del Gasto"
                  className="bg-slate-100 p-2"
                  name="expenseName"
                  value={expense.expenseName}
                  onChange={handleChange}

                  />
            </div>
            <div className="flex flex-col gap-2">
                  <label
                  htmlFor="amount"
                  className="text-xl"
                  >Cantidad:</label>
                  <input
                  type="number"
                  id="amount"
                  placeholder="Añada la cantidad del Gasto ej 300"
                  className="bg-slate-100 p-2"
                  name="amount"
                  value={expense.amount}
                  onChange={handleChange}
                  
                  />
            </div>


            <div className="flex flex-col gap-2">
                  <label
                  htmlFor="amount"
                  className="text-xl"
                  >Categoria:</label>

                  <select
                  id="category"
                  className="bg-slate-100 p-2"
                  name="category"
                  value={expense.category}
                  onChange={handleChange}
                  
                  >
                    <option value="">Selecciones --  </option>
                      {categories.map(category =>(
                          <option
                                key={category.id}
                                value={category.id}
                          
                          > {category.name} </option>
                      ))}
                  
                  </select>
            </div>

            <div className="flex flex-col gap-2">
                  <label>Fecha Gasto:</label>
                  <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                  
                  />
            </div>


            <input 
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={'Registrar Gasto'}
                      
            />
        </form>
  )
}
