import "react-dates/lib/css/_datepicker.css";
import React, { useState } from "react";
import { connect } from "react-redux";
import { addExpense, editExpense } from "../actions/expenses";
import { SingleDatePicker } from "react-dates";
import moment from "moment";


export const ExpenseModifyComponent = (props) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseNote, setExpenseNote] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenseError, setExpenseError] = useState('');
  const [isCalendarFocused, setIsCalendarFocused] = useState(false);

  //Si tenemos un expense(Estamos editando) pasamoslo
  React.useEffect(() => { //Usamos con react porque necesitamos el para usar in jest. (No hay ninguna lógica es solo funciona asi)
    if (!!props.expense) {
      setExpenseName(props.expense.description);
      setExpenseValue(props.expense.amount);
      setExpenseNote(props.expense.note);
      setExpenseDate(moment(props.expense.createdAt));
    }
  }, []);

  const onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      //REGEX Code for 234.34 like numbers
      setExpenseValue(amount);
    }
  };

  //Hicimos como asi porque dicen lo en docs de airbnb
  const onFocusChange = ({ focused }) => {
    setIsCalendarFocused(focused);
  };

  const onDateChange = (date) => {
    //Si hay un dato el usuario no tiene eliminar ninguna letra
    if (date) {
      setExpenseDate(date);
    }
  };
  // Fin de airbnb docs

  const handleModifyExpense = (e) => {

    e.preventDefault();
    //Si hay un expense objeto en props (Cuando editamos)
    if (!!props.expense) {
      //Pasamos nuevo expense a nuestra reducer en redux
      props.dispatch(
        editExpense(props.expense.id, {
          description: expenseName,
          note: expenseNote,
          amount: expenseValue,
          createdAt: expenseDate.valueOf()
        })
      );
      props.processCompleted();
    } else if (!props.expense) {
      //Nuevo expense
      
      if (!expenseName || !expenseValue) {
        // Son esencial
        setExpenseError('Please provide a valid description and amount.');
      } else {
        props.dispatch(
          addExpense({
            description: expenseName,
            note: expenseNote,
            amount: expenseValue,
            createdAt: expenseDate.valueOf()
          })
        );
        setExpenseName("");
        setExpenseValue("");
        // A la componente de tablero
        props.processCompleted();
      }
    } else {
      console.log("no match for the button");
    }
  };
  return (
    <div>
      {expenseError && <p className='expenses-modify-component-errors' >{expenseError}</p>}
      {props.expense ? <h3> Edit Expense </h3> : <h3> Add New Expense </h3>}
      <SingleDatePicker
        date={expenseDate || moment()} //  or null
        onDateChange={onDateChange}
        focused={isCalendarFocused} // PropTypes.bool
        onFocusChange={onFocusChange} // PropTypes.func.isRequired
        id="your_unique_id" // PropTypes.string.isRequired,
        numberOfMonths={1} //Numero de meses los usarios veran en componente
        isOutsideRange={() => false} //Ahora podemos elegir los dias del pasado
      />
      <form onSubmit={handleModifyExpense}>
        Expense Description:
        <br />
        <input
          onChange={(e) => setExpenseName(e.target.value)}
          value={expenseName}
          type="text"
          autoFocus
          placeholder="Description"
          className='expenses-modify-component-name-input'
        />
        <br />
        Expense Note:
        <br />
        <textarea
          onChange={(e) => setExpenseNote(e.target.value)}
          value={expenseNote}
          type="text"
          autoFocus
          placeholder="Additional Notes"
        />
        <br />
        Expense Amount:
        <br />
        <input
          onChange={(e) => onAmountChange(e)}
          value={expenseValue}
          placeholder="Amount"
          type="number"
        />
        <br />
        <input type='submit' className="add-todo" value={props.expense ? "Edit Todo" : "Add Todo"} />
      </form>
    </div>
  );
};

// El primer argumento es null porque no necesitamos alcanzar al store aqui.
export default connect(null, null)(ExpenseModifyComponent);
