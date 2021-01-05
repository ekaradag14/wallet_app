//Estas funciones son solo algunos atajos para no escribir tipo cada vez escribimos las funciones
export const setTextFilter = (text = '') => ({
  type: "SET_TEXT_FILTER",
  text
});
export const sortByAmount = () => ({
  type: "CHANGE_SORTING",
  sortBy: "amount"
});
export const sortByDate = () => ({
  type: "CHANGE_SORTING",
  sortBy: "date"
});
export const setStartDate = (date) => ({
  type: "SET_START_DATE",
  date
});
export const setEndDate = (date) => ({
  type: "SET_END_DATE",
  date
});
