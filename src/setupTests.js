// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // Para usar enzyme con solo partes del sobre react v.16. Asi tendríamos un paquete del enzyme mas pequeño


Enzyme.configure({
  adapter: new Adapter(),
});