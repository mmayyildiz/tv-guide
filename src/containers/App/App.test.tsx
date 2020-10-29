import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';


const mockStore = configureStore();
const store = mockStore();

const props = {
  "channels": [
    {
      "sid": "2002",
      "t": "BBC One Lon",
      "c": "101",
      "sf": "SD",
      "sg": "Entertainment"
    },
    {
      "sid": "2006",
      "t": "BBC Two",
      "c": "102",
      "sf": "SD",
      "sg": "Entertainment"
    },
  ]
};

const wrapper = shallow(
  <Provider store={store}>
    <App {...props} />
  </Provider>
);

describe('My App Component', () => {

  it('should render correctly with default props and redux store', () => {
    expect(wrapper).toMatchSnapshot();
  });

});

