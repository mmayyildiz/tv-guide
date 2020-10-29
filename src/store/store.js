import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadData, saveData } from '../cache/localStorage';

const persistedState = loadData('channels');

export const store = createStore(
    reducers,
    persistedState,
    compose(applyMiddleware(thunk), composeWithDevTools())
);

store.subscribe(() => {
    saveData('channels', {
        channels: store.getState().channels
    });
});
