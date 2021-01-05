import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';
import toJSON from 'enzyme-to-json';


  let history,wrapper;
beforeEach(() => {
    history = { push: jest.fn()}
    wrapper = shallow(<AddExpensePage history = {history} />)
   
})
test('should render the page correctly', () => {
     expect(wrapper).toMatchSnapshot();
})