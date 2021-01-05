
import reportWebVitals from './reportWebVitals';
import 'react-dates/initialize';
// import validator from 'validator';
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import moment from 'moment';
import './styles/styles.scss';
import 'normalize.css';

const store = configureStore(); //Ahora podemos usar todos las funciones de  dispatch

//Cuando llamamos unsubscribe() dejamos de  controlar el store
const unsubscribe = store.subscribe(() => {
  let state = store.getState();
});
//Algunos articulos defectos
const itemOne = store.dispatch(
  addExpense({
    description: 'Water Bill',
    amount: 270,
    createdAt: moment().subtract('4', 'day').valueOf(),
  })
);
//itemTwo es ahora un objeto de store dispatch
const itemTwo = store.dispatch(
  addExpense({
    description: 'Gas Bill',
    amount: 430,
    createdAt: moment().subtract('7', 'day').valueOf(),
  })
);
const itemThree = store.dispatch(
  addExpense({
    description: 'Electric Bill',
    amount: 355,
    createdAt: moment().subtract('3', 'day').valueOf(),
  })
);

const jsx = (
  //Para utilizar react-redux
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
