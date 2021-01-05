import { v4 as uuidv4 } from "uuid";
//Aqui desestructamos el primero objeto. Si tenemos ninguna tenemos un valor defecto. (Un objeto vacio)
export const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuidv4(),
    description,
    note,
    amount,
    createdAt
  }
});
//Estas funciones son solo algunos atajos para no escribir tipo cada vez escribimos las funciones
export const removeExpense = ({ id = "" } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});
