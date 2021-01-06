import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseDashboardPage } from '../../components/ExpenseDashboardPage';
import expenses from '../fixtures/expenses'
import toJSON from 'enzyme-to-json';
 
describe('Expense Dashboard Page Test Scenarios', () => {
test('should render ExpenseDashboardPage with expenses', () => {
  const wrapper = shallow(<ExpenseDashboardPage expenses={expenses} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should render no expense text in ExpenseDashboardPage', () => {
  const wrapper = shallow(<ExpenseDashboardPage expenses={[]} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
})

