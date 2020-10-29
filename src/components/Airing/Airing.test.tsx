import React from 'react';
import { shallow } from 'enzyme';
import Airing from './Airing';

const props = {
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
};

const mountedComponent = shallow(<Airing {...props} />);

describe('Airing', () => {

    it('should render with props', () => {
        expect(mountedComponent).toMatchSnapshot();

    });

    it('should render the tv guide div ', () => {
        const divs = mountedComponent.find('.tvg-grid__program__inner');
        expect(divs.length).toBe(1);
    });


});
