import React from "react";
//Usamos react-redux para alcanzar al store directamente de los componentes
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
//Importamos el función para filtrar nuestra store
import selectExpenses from "../selectors/expenses";
import ExpenseListFilters from "./ExpenseListFilters";

export const ExpenseDashboardPage = ({ expenses }) => { //Exportamos este para probar con jest.js
  const listIt = expenses.map((element) => (
    //Doy todo objeto en un manera rested
    <ExpenseListItem key={element.id} {...element} />
  ));

  return (
    <div>
      This is my expense list
      <ExpenseListFilters />
      {expenses.length === 0 ? <p>I have no expenses :)</p> : listIt }
    </div>
  );
};

const mapsStateToProps = (state) => {
  //Volvemos que necesitamos de store
  return {
    //Solo damos un estado filtrado para mostrar.
    expenses: selectExpenses(state.expenses, state.filters)
  };
  //Ahora tenemos gastos y filtros en props de ExpenseList
};

// El argumento primer es para función que desestructura el store. El argumento secundario es para a cual componente pasamos los partes de store.

export default connect(mapsStateToProps)(ExpenseDashboardPage);
