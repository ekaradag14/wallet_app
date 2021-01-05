import React from "react";
import ExpenseModifyComponent from "./ExpenseModifyComponent";
export const AddExpensePage = (props) => {
  return (
    <div>
      <ExpenseModifyComponent
        processCompleted={() => {
          //Una vez acabamos modificando de expense redireccionamos el usuario a componente de tablero
          props.history.push("/");
        }}
      />
    </div>
  );
};

// El primer argumento es null porque no necesitamos alcanzar al store aqui.
export default AddExpensePage;
