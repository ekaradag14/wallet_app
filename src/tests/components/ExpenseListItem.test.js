import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListItem } from '../../components/ExpenseListItem';
import  expenses from '../fixtures/expenses';
import toJSON from 'enzyme-to-json';

describe('Expense List Item Test Scenarios', () => {
    test('should render the item correctly', () => {
        const wrapper = shallow(<ExpenseListItem {...expenses[0]} />)
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    test('should show default note text', () => {
        const wrapper = shallow(<ExpenseListItem {...expenses[2]} />)
         expect(toJSON(wrapper)).toMatchSnapshot();
    })
})