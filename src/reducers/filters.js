const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};
//Cambiamos estado del filtros en redux con funciones de acciones
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text || '',
      };
    case 'CHANGE_SORTING':
      return {
        ...state,
        sortBy: action.sortBy,
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.date,
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.date,
      };
    default:
      return state;
  }
};

export default filtersReducer;
