//Si tenemos un valor defecto complejo estas valores defectos sera util
const expensesReducerDefaultState = [];
//Cambiamos estado del expenses en redux con funciones de acciones
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      //Añadimos un expense nuevo
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => expense.id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        //Actualizamos un objeto soltero que concuerda con nuestra id
        if (expense.id === action.id) {
          return {
            //Todas las actualizaciones sobrescriben el estado previo
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });

    default:
      return state;
  }
};

export default expensesReducer;
