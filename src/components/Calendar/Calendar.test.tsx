import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

const mockCallBack = jest.fn();

const props = {
    selectedDate: 'foo',
    changeDate: mockCallBack
};


const mountedComponent = shallow(<Calendar {...props} />);

describe('Calendar', () => {

    it('should render with props', () => {
        expect(mountedComponent).toMatchSnapshot();
    });

    it('should render the calendarDay div ', () => {
        const divs = mountedComponent.find('.calendarDay');
        expect(divs.length).toBe(7);
    });

});
