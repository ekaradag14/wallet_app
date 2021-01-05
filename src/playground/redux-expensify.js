import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

//Aqui desestructamos el primero objeto. Si tenemos ninguna tenemos un valor defecto. (Un objeto vacio)
const addExpense = ({
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
const removeExpense = ({ id = "" } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

const setTextFilter = (text) => ({
  type: "SET_TEXT_FILTER",
  text
});
const sortByAmount = () => ({
  type: "CHANGE_SORTING",
  sortBy: "amount"
});
const sortByDate = () => ({
  type: "CHANGE_SORTING",
  sortBy: "date"
});
const setStartDate = (date) => ({
  type: "SET_START_DATE",
  date
});
const setEndDate = (date) => ({
  type: "SET_END_DATE",
  date
});

//Si tenemos un valor defecto complejo estas valores defectos sera util
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter((expense) => expense.id !== action.id);

    case "EDIT_EXPENSE":
      return state.map((expense) => {
        //Actualizamos un objeto soltero que concuerda con nuestra id
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });

    default:
      return state;
  }
};

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text || ""
      };
    case "CHANGE_SORTING":
      return {
        ...state,
        sortBy: action.sortBy
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.date
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.date
      };
    default:
      return state;
  }
};

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      //Usamos || por utilizar filtros aunque no tenemos todos los valores para filtros
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch =
        typeof text !== "string" ||
        expense.description.toLowerCase().includes(text.toLocaleLowerCase());
      //Devolvemos un objeto si concuerdas a todos los filtros
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      //sort funcion de javascript.
      if (sortBy === "date") {
        // Ordenamos de nuevo a viejo
        return a.createdAt > b.createdAt ? 1 : -1; // En sort si queremos a ven antes de b devolvemos -1
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
      return 0;
    });
};

//Cuando disparamos un dispatch todos los reducers tomaron este dispatch y contrallar si tienen este tipo de dispatch y dispararan
const store = createStore(
  //Utilizamos combineReducers para rompiendo el store en pedazos mas pequenos
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

//se redux-101 for unsubscribe
const unsubscribe = store.subscribe(() => {
  let state = store.getState();
  console.log(getVisibleExpenses(state.expenses, state.filters));
});

//store.dispatch suncion devolves la instancia de elemento
const itemOne = store.dispatch(
  addExpense({ description: "Rent", amount: 1000, createdAt: 1000 })
);
const itemTwo = store.dispatch(
  addExpense({ description: "Booze", amount: 300, createdAt: 250 })
);

//console.log(itemOne);
//store.dispatch(removeExpense({ id: itemOne.expense.id }));
//store.dispatch(editExpense(itemOne.expense.id, { amount: 700 }));
//store.dispatch(setTextFilter("Re"));
//store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
//store.dispatch(sortByDate());
//store.dispatch(setStartDate(-124));
//store.dispatch(setEndDate(124));

const demoState = {
  expenses: [
    {
      id: "jadhbfb",
      description: "January Rent",
      note: "This was the final payment for that address",
      amount: 54500,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount", // date or amount
    startDate: undefined,
    endDate: undefined
  }
};

//console.log({...demoState.filters,text:'notRent',sortBy:undefined})
