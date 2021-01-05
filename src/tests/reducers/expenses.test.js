import expensesReducer from '../../reducers/expenses';

describe.skip('Expenses Reducer Test Scenarios',()=> {
let exampleExpense;
 let action = {};

 beforeAll(() => {
     exampleExpense = {
        id:1,
        description: 'Rent',
        note: "This month's rent",
        amount: 220,
        createdAt: 100,
      }
 })
     test('should initialize correctly', () => {
       action.type = '@@INIT'; //Package itself initializes itself this way
       expect(expensesReducer(undefined, action)).toEqual([]);
     });
    test('should add an expense',()=>{
        action.type = 'ADD_EXPENSE';
        action.expense = exampleExpense;
        expect(expensesReducer(undefined,action)).toEqual([exampleExpense])
    })
    test('should remove an expense',()=>{
        action.type = 'REMOVE_EXPENSE';
        action.id = 1;
        expect(expensesReducer([exampleExpense],action)).toEqual([])
    })
    test('should edit an expense',()=>{
        action.type = 'EDIT_EXPENSE';
        action.id = 1;
        action.updates = { note: "Last month's gas", amount: 340 };
        expect(expensesReducer([exampleExpense],action)).toEqual([{...exampleExpense, ...action.updates}])
    })
    test('should not edit an expense because of wrong id',()=>{
        action.type = 'EDIT_EXPENSE';
        action.id = 2;
        action.updates = { note: "Last month's gas", amount: 340 };
        expect(expensesReducer([exampleExpense],action)).toEqual([exampleExpense])
    })
    test('should not edit an expense because nothing to update',()=>{
        action.type = 'EDIT_EXPENSE';
        action.id = 1;
        action.updates = {};
        expect(expensesReducer([exampleExpense],action)).toEqual([exampleExpense])
    })
})