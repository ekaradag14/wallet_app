
import reportWebVitals from './reportWebVitals';
import 'react-dates/initialize';
// import validator from 'validator';
import './styles/styles.scss';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';



const store = configureStore(); //Ahora podemos usar todos las funciones de  dispatch

//Cuando llamamos unsubscribe() dejamos de  controlar el store 
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
