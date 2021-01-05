import React from 'react';
import { shallow } from 'enzyme'
import moment from 'moment'
import {ExpenseModifyComponent} from '../../components/ExpenseModifyComponent'
import toJSON from 'enzyme-to-json'
import expenses from '../fixtures/expenses'
import {SingleDatePicker} from 'react-dates'

describe.skip('Expense Modify Component Test Scenarios', () => {
    let useEffect;
    let mockUseEffect = () => { //Es de una solución de internet
        useEffect.mockImplementationOnce((f) => f());
    };

    test('should render the component with default values', ()=> {
        const wrapper = shallow(<ExpenseModifyComponent/>);
        expect(toJSON(wrapper)).toMatchSnapshot()
    })

    test('should render the component with given values', () => {
        useEffect = jest.spyOn(React, 'useEffect');
        mockUseEffect()
        const wrapper = shallow (<ExpenseModifyComponent expense= {expenses[0]} />)
        expect(toJSON(wrapper)).toMatchSnapshot()
    })

    test('should render error for invalid form submission', () => {
        const wrapper = shallow(<ExpenseModifyComponent  processCompleted={() => {}}/>); //processCompleted es un prop de ExpenseModifyComponent. No damos nada mas props porque queremos que probar un mensaje de error.
        wrapper.find('form').simulate('submit', { preventDefault: () => {},}); //Buscamos un niño de nuestro componente con clase de .add-todo (que es un botón). Pues simulamos del evento de click y nos burlamos preventDefault.
        //Con componentes funcionales no podemos usar estado de wrapper(Podemos usar este con componentes de tipo clase). Por eso vigilamos componente niño donde mostramos mensaje de error.
        expect(wrapper.find(".expenses-modify-component-errors").length).toBeGreaterThan(0);
    })

    test('should control changed input in name input', () => {
        const value = 'Brand New Description';
        const wrapper = shallow(<ExpenseModifyComponent  />); 
        wrapper.find('input[placeholder~="Description"]').simulate('change',{ target : { value }}) 
        // Recuerda: Este tipo de css selector no funcionan en Safari
        expect(wrapper.find('input[placeholder~="Description"]').props().value).toEqual(value); //Controlamos value de input desde no podemos accesar el estado 
    })

    test('should control changed input in description input', () => {
        const value = 'Brand New Note';
        const wrapper = shallow(<ExpenseModifyComponent  />); 
        wrapper.find('textarea').at(0).simulate('change',{ target : { value }}) //at(0) significa buscar el primer textarea en nuestra wrapper
        expect(wrapper.find('textarea').at(0).props().value).toEqual(value); //Controlamos value de input desde no podemos accesar el estado 
    })

    test('should set amount if valid input', () => {
        const value = '23.45';
        const wrapper = shallow(<ExpenseModifyComponent  />); 
        wrapper.find('input[placeholder~="Amount"]').simulate('change',{ target : { value }}) 
        // Recuerda: Este tipo de css selector no funcionan en Safari
        expect(wrapper.find('input[placeholder~="Amount"]').props().value).toEqual(value); //Controlamos value de input desde no podemos accesar el estado 
    })

    test('should set amount if in valid input', () => {
        const value = '23.45';
        const wrongValue = '23.452343';
        const wrapper = shallow(<ExpenseModifyComponent  />); 
        wrapper.find('input[placeholder~="Amount"]').simulate('change',{ target : { value }}) 
        wrapper.find('input[placeholder~="Amount"]').simulate('change',{ target : { value: wrongValue }}) 
        expect(wrapper.find('input[placeholder~="Amount"]').props().value).toEqual(value); //Controlamos value de input desde no podemos accesar el estado 
    })

    test('should call onSubmit prop fro valid form submission',() => {
      const onSubmitSpy = jest.fn();//Burlaremos de un función
      useEffect = jest.spyOn(React, 'useEffect');
      mockUseEffect(); //Necesitamos burlarse de useEffect para poner datos de expense
      const wrapper = shallow(<ExpenseModifyComponent expense={expenses[0]} dispatch={onSubmitSpy}  processCompleted={() => {} }/>);//Burlamos de dispatch
 
      wrapper.find('form').simulate('submit', { preventDefault: () => {},}); //Burlamos de submit del form
      expect(onSubmitSpy).toHaveBeenLastCalledWith({ //La input después de addExpense de acciones 
      "id": 0,
      "type": "EDIT_EXPENSE",
      "updates": {
          "amount": 220,
          "createdAt": 100,
          "description": "Rent",
          "note": "This month's rent",
       }
      })
    })

    test('should set date if date given to SingleDatePicker', () => {
      const wrapper = shallow(<ExpenseModifyComponent />);
      wrapper.find(SingleDatePicker).prop('onDateChange')(moment(1)); //Buscamos la componente SingleDatePicker y damos un prop y llamamos lo
      expect(wrapper.find(SingleDatePicker).prop('date').valueOf()).toBe(moment(1).valueOf())
    })

    test('should set focus on SingleDatePicker', () => {
        
      const wrapper = shallow(<ExpenseModifyComponent />);
      wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused: true}); //Buscamos la componente SingleDatePicker y damos un prop y llamamos lo
      expect(wrapper.find(SingleDatePicker).prop('focused').valueOf()).toBe(true)
    })
})