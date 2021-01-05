import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from '../../actions/filters';

describe.skip('Filter actions test scenarios', () =>{

test('should set text filter', () => {
  expect(setTextFilter('foo')).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'foo',
  });
});

test('should set empty text filter', () => {
  expect(setTextFilter()).toEqual({
    type: 'SET_TEXT_FILTER',
    text: '',
  });
});

test('should sort by amount', () => {
  expect(sortByAmount()).toEqual({
    type: 'CHANGE_SORTING',
    sortBy: 'amount',
  });
});

test('should sort by date', () => {
  expect(sortByDate()).toEqual({
    type: 'CHANGE_SORTING',
    sortBy: 'date',
  });
});

test('should set start date', () => {
  expect(setStartDate(1000)).toEqual({
    type: 'SET_START_DATE',
    date: 1000,
  });
});

test('should set end date', () => {
  expect(setEndDate(1000)).toEqual({
    type: 'SET_END_DATE',
    date: 1000,
  });
});
})