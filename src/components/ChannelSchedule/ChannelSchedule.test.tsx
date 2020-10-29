import React from 'react';
import { shallow } from 'enzyme';
import ChannelSchedule from './ChannelSchedule';

const props = {
    events: [
        {
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
        {
            eid: 'dummy',
            st: 2,
            d: 1,
            t: 'dummy',
            sy: 'dummy',
            eg: 'dummy',
            s: true,
            ad: true,
            hd: false,
            new: true
        }
    ]
}



const mountedComponent = shallow(<ChannelSchedule {...props} />);

describe('ChannelSchedule', () => {

    it('should render with props', () => {
        expect(mountedComponent).toMatchSnapshot();

    });


    it('should render a list ', () => {
        const lis = mountedComponent.find('li');
        expect(lis.length).toBe(2);
    });

});
