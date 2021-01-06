import React from 'react'
import { shallow } from 'enzyme'// //Shallow es solo para trabajar con componente mas bien que todo objeto de DOM.
import toJSON from 'enzyme-to-json'//Es paquete para cambiar el formato de nuestra snapshot para ser mas limpiar cuando usamos enzymeö
import Header from '../../components/Header'

describe('Header Component Testing Scenarios', ()=> {

    test('should render Header correctly', () => {
      const wrapper = shallow(<Header />);
      expect(toJSON(wrapper)).toMatchSnapshot(); //Creamos una copia de nuestra componente para vigilar. Si hay una diferencia que queremos guardar, vamos a pulsar u en command line
     //Normalmente no deberíamos usar toJSON porque tenemos     "snapshotSerializers":[  "enzyme-to-json/serializer"] en jest.config.json. Y ese hace este automáticamente pero usamos un Adapter no oficial. Probablemente tenemos un error allí.
 
    })
})
