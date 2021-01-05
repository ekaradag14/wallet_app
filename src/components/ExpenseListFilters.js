import "react-dates/lib/css/_datepicker.css";
import React, { useState } from "react";
import {
  setTextFilter,
  sortByDate,
  setStartDate,
  setEndDate,
  sortByAmount
} from "../actions/filters";
import { connect } from "react-redux";
import { DayPickerRangeController } from "react-dates";
import moment from "moment";
const ExpenseListFilters = ({
  putTextFilter,
  putSortDateFilter,
  putAmountFilter,
  putStartDateFilter,
  putEndDateFilter,
  filterValue
}) => {
  const [expenseFilterController, setExpenseFilterController] = useState({
    isInputNecessary: false,
    isCalendarNecessary: false,
    focusedInput: "startDate",
    startDate: null,
    endDate: null
  });
  // Para controlar el estado complejo
  const handleChange = (input) => {
    const { value, name } = input;

    setExpenseFilterController((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const resetFilters = () => {
    //Antes de ordenar nuestra lista. Necesitamos limpiar nuestra filtros.
    //Tomamos nuestra lista directamente después de filtrarlo
    putStartDateFilter(null);
    putEndDateFilter(null);
    putTextFilter("");
  };

  const handleExtraComponents = (calendarComponent, textField) => {
    //Solo necesitamos estas zonas si usamoslos
    handleChange({ name: "isCalendarNecessary", value: calendarComponent });
    handleChange({ name: "isInputNecessary", value: textField });
  };
  const handleSetFilter = (filterType) => {
    switch (filterType) {
      case "Sort By Date":
        handleExtraComponents(false, false);
        resetFilters();
        //Y llamamos nuestra mascara para dispatch(sortByDate())
        putSortDateFilter();
        break;
      case "Sort By Amount":
        handleExtraComponents(false, false);
        resetFilters();
        putAmountFilter();
        break;
      case "Put Text Filter":
        resetFilters();
        handleExtraComponents(false, true);
        break;
      case "Put Date Filter":
        resetFilters();
        handleExtraComponents(true, false);
        break;
      default:
    }
  };

  //Necesario para react componente de airbnb
  const onFocusChange = (focusedInput) => {
    handleChange({
      name: "focusedInput",
      value: !focusedInput ? "startDate" : focusedInput
    });
  };

  //Necesario para react componente de airbnb
  const onDatesChange = ({ startDate, endDate }) => {
    handleChange({ name: "startDate", value: startDate });
    handleChange({ name: "endDate", value: endDate });
    startDate && putStartDateFilter(startDate.valueOf());
    endDate && putEndDateFilter(endDate.valueOf());
  };

  return (
    <div>
      <select
        //Tiene los atributos mismos de input
        value={filterValue}
        onChange={(e) => handleSetFilter(e.target.value)}
      >
        <option>Sort By Date</option>
        <option>Sort By Amount</option>
        <option>Put Text Filter</option>
        <option>Put Date Filter</option>
      </select>

      {expenseFilterController.isInputNecessary && (
        <input
          type="text"
          value={filterValue}
          onChange={(e) => putTextFilter(e.target.value)}
        />
      )}
      {/* Puedes encontrar las docs sobre este componente en github o site de airbnb*/}
      {expenseFilterController.isCalendarNecessary && (
        <DayPickerRangeController
          startDate={expenseFilterController.startDate}
          endDate={expenseFilterController.endDate}
          onDatesChange={onDatesChange}
          focusedInput={expenseFilterController.focusedInput}
          onFocusChange={onFocusChange}
          initialVisibleMonth={() => moment()}
      
        />
      )}
    </div>
  );
};

//Mapeamos algunos atributos para utilizar funciones directamente.
//react-redux toma dispatch directamente
const mapDispatchToProps = (dispatch) => {
  return {
    //Estas funciones son solamente algunos atajos para usar mas bien que escribir el objeto directamente
    putTextFilter: (filter) => dispatch(setTextFilter(filter)),
    putStartDateFilter: (date) => dispatch(setStartDate(date)),
    putEndDateFilter: (date) => dispatch(setEndDate(date)),
    putSortDateFilter: () => dispatch(sortByDate()),
    putAmountFilter: () => dispatch(sortByAmount())
  };
};

//Usamos valor de filtro en input
const mapsStateToProps = (state) => {
  return {
    filterValue: state.filter
  };
};
//El primer para obtener el estado de store, y segundo para obtener acciones. y Por ultimo envolvemos nuestro componente
export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(ExpenseListFilters);
