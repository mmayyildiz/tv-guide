import React from 'react';
import { shallow } from 'enzyme';
import AiringDetails from './AiringDetails';

const mockCallBack = jest.fn();

const props = {
    event: {
        eid: 'foo',
        st: 1,
        d: 1,
        t: 'foo',
        sy: 'foo',
        eg: 'foo',
        s: true,
        ad: true,
        hd: true,
        new: true
    },
    closePopup: mockCallBack
};


const mountedComponent = shallow(<AiringDetails {...props} />);

describe('AiringDetails', () => {

    it('should render with props', () => {
        expect(mountedComponent).toMatchSnapshot();
    });

    it('should render the popup div ', () => {
        const comp = mountedComponent.find('.popup');
        expect(comp.length).toBe(1);
    });

    it("should call a function passed to it when the button clicked ", () => {
        mountedComponent.find("button").simulate("click");
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

});
