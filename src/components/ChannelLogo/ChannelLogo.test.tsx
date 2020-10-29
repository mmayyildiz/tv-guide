import React from 'react';
import { shallow } from 'enzyme';
import ChannelLogo from './ChannelLogo';

const props = {
    sid: 'foo',
    size: '10'
};


const mountedComponent = shallow(<ChannelLogo {...props} />);

describe('ChannelLogo', () => {

    it('should render with props', () => {
        expect(mountedComponent).toMatchSnapshot();
    });

    it('should render a logo ', () => {
        expect(mountedComponent.find("img").prop("src")).toEqual("https://cdn.skyq.sky.com/recruitment/tvguide/logos/foo/10.png");

    });


});


