import React from "react";
import ExpenseModifyComponent from "./ExpenseModifyComponent";
import { connect } from "react-redux";

const EditExpensePage = ({ expenses, match, expense,history }) => {
  return (
    <div>
      {expense && <h3>Editing {expense.description} expense </h3>}
      <ExpenseModifyComponent
        expense={expense}
        processCompleted={() => {
          history.push("/");
        }}
      />
    </div>
  );
};

const mapsStateToProps = (state, props) => { // Pasamos el estado para buscar por el expense 
  //Y Después pasamos ese expense a props para usarlo
  return {
    expense: state.expenses.find((item) => item.id === props.match.params.id)
      //match.params.id es id de nuestra expense la url de pagina es dinámica y construimos con la id
  };
};

export default connect(mapsStateToProps)(EditExpensePage);
