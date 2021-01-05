import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

//Exportamos un función porque cuando importamos configureStore vamos a tomar un instancia de store directamente
const storeFunc = () => {
  //Cuando disparamos un dispatch todos los reducers tomaron este dispatch y contrallar si tienen este tipo de dispatch y dispararan
  const store = createStore(
    //Utilizamos combineReducers para rompiendo el store en pedazos mas pequeños
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
    }),
    //Para usar con redux dev tools en chrome
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};

export default storeFunc;