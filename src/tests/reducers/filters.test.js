import filtersReducer from '../../reducers/filters';

describe.skip('Filter Reducer Test Scenarios', () => {
let filtersReducerDefaultState;
let action = {};
beforeAll(() => {
 filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};
})
    test('should initialize correctly', () => {
        action.type = '@@INIT'; //Package itself initializes itself this way
        expect(filtersReducer(undefined,action)).toEqual({...filtersReducerDefaultState})
    })

    test('should set text filter', () => {
        action.type = 'SET_TEXT_FILTER';
        action.text = 'Text Filter'
        expect(filtersReducer(undefined,action)).toEqual({...filtersReducerDefaultState, text: 'Text Filter'})
    });

    test('should change sorting', () => {
        action.type = 'CHANGE_SORTING';
        action.sortBy = 'Date';
        expect(filtersReducer(undefined,action)).toEqual({...filtersReducerDefaultState, sortBy: 'Date'})
    });

    test('should set startDate filter', () => {
        action.type = 'SET_START_DATE';
        action.date = -3;
        expect(filtersReducer(undefined,action)).toEqual({...filtersReducerDefaultState, startDate: -3})
    });

    test('should set endDate filter', () => {
        action.type = 'SET_END_DATE';
        action.date = -2;
        expect(filtersReducer(undefined,action)).toEqual({...filtersReducerDefaultState, endDate: -2})
    });

    test('should return the object w/out any changes', () => {
        action.type ='';
        expect(filtersReducer(undefined,action)).toEqual({...filtersReducerDefaultState})
    })
} )
