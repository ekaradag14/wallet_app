const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      //Usamos || por utilizar filtros aunque no tenemos todos los valores para filtros
      const startDateMatch =
        typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch =
        typeof text !== 'string' ||
        expense.description.toLowerCase().includes(text.toLocaleLowerCase());
      //Devolvemos un objeto si concuerdas a todos los filtros
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      //sort función de javascript.
      if (sortBy === 'date') {
        // Ordenamos de nuevo a viejo
        return a.createdAt > b.createdAt ? 1 : -1; // En sort si queremos a ven antes de b devolvemos -1
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
      return 0;
    });
};

export default getVisibleExpenses;
