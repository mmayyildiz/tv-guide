import React from 'react';
import { shallow } from 'enzyme';
import ChannelHeader from './ChannelHeader';

const props = {
    channels: ['1', '2', '3']
};

const mountedComponent = shallow(<ChannelHeader {...props} />);

describe('CalendarHeader', () => {

    it('should render with props', () => {
        expect(mountedComponent).toMatchSnapshot();
    });

    it('should render a list ', () => {
        const lis = mountedComponent.find('li');
        expect(lis.length).toBe(3);
    });

});
