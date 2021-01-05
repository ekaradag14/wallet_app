import getVisibleExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses'
describe.skip('Expense Selector Scenarios', () => {
    let exampleExpenses,
        exampleFilters,
        exampleTextFilteredExpenses,
        exampleStartDateFilteredExpenses,
        exampleEndDateFilteredExpenses,
        exampleAmountSortedExpenses;


    beforeAll(() => {
    exampleExpenses = expenses;
    exampleAmountSortedExpenses = [exampleExpenses[1],exampleExpenses[0],exampleExpenses[2]];
    exampleTextFilteredExpenses = [exampleExpenses[1]];
    exampleStartDateFilteredExpenses = [exampleExpenses[2]];
    exampleEndDateFilteredExpenses = [exampleExpenses[0]];
    })
    
    beforeEach(() => {

    exampleExpenses = [
      {
        description: 'Rent',
        note: "This month's rent",
        amount: 220,
        createdAt: 100,
      },
      {
        description: 'Gas',
        note: 'Gas Bill',
        amount: 340,
        createdAt: 150,
      },
      {
        description: 'Electricity',
        note: 'Electricity Bill',
        amount: 150,
        createdAt: 280,
      },
    ];

    exampleFilters = {text: '', sortBy: null, startDate: null, endDate: null};
    });
 
test('should return all of the expenses', () => {
    expect(getVisibleExpenses(exampleExpenses,exampleFilters)).toEqual(exampleExpenses)
})

test('should set a text filter', () => {
    exampleFilters.text = 'Gas';
    expect(getVisibleExpenses(exampleExpenses,exampleFilters)).toEqual(exampleTextFilteredExpenses)
})

test('should set startDate filter',() => {
    exampleFilters.startDate = 250;
    expect(getVisibleExpenses(exampleExpenses,exampleFilters)).toEqual(exampleStartDateFilteredExpenses)
})

test('should set endDate filter',() => {
    exampleFilters.endDate = 120;
    expect(getVisibleExpenses(exampleExpenses,exampleFilters)).toEqual(exampleEndDateFilteredExpenses)
})

test('should set sortBy amount filter',() => {
    exampleFilters.sortBy = 'amount';
    expect(getVisibleExpenses(exampleExpenses,exampleFilters)).toEqual(exampleAmountSortedExpenses)
})

test('should set sortBy date filter',() => {
    exampleFilters.sortBy = 'date';
    expect(getVisibleExpenses(exampleExpenses,exampleFilters)).toEqual(exampleExpenses)
})

test('should set text & startDate filter',() => {
    exampleFilters.text = 'Gas';
    exampleFilters.startDate = 400;
    expect(getVisibleExpenses(exampleExpenses,exampleFilters)).toEqual([])
})

})
