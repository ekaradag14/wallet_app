import { createStore } from "redux";

// Creamos incrementCount por no tener errores tipográficos.
const incrementCount = ({ incrementBy = 1 }) => ({
  //Desestructuramos primer argumento de función para obtener incrementBy directamente
  //Damos un valor defecto. por eso no controlamos si tenemos un valor para incrementBy
  type: "INCREMENT",
  incrementBy //incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1 }) => ({
  type: "DECREMENT",
  decrementBy
});

const reset = () => ({
  type: "RESET"
});

const set = ({ count = 1 }) => ({
  type: "SET",
  count
});

const countReducer = (state = { count: 0 }, action) => {
  //no controlamos action.incrementBy porque damos un valor defecto de cualquier manera
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };
    case "SET":
      return {
        count: action.count
      };
    case "RESET":
      return {
        count: 0
      };
    default:
      return state;
  }
};

//Usamos action para cambiar el estado afuera de store
const store = createStore(countReducer);

//Subscribe haz algo cada vez el estado cambias. La razón nombramos lo unsubscribe es para cuando
// detenemos observando el estado llamamos unsubscribe()
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 15 }));
store.dispatch(decrementCount({ decrementBy: 8 }));
store.dispatch(reset());
store.dispatch(set({ count: 200 }));
