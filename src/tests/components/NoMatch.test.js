import React from 'react';
import { shallow } from 'enzyme';
import { NoMatch } from '../../components/NoMatch';
import toJSON from 'enzyme-to-json';

describe('No Match Page Test Scenarios', () => {
    test('should render the item correctly', () => {
        let location = {}
        location.pathname = `No Man's Land`
        const wrapper = shallow(<NoMatch location={location} />);
        expect(toJSON(wrapper)).toMatchSnapshot()
    })
})