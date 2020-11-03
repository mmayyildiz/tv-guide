import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './index';
import { loadData, saveData } from '../cache/localStorage';

const persistedState = loadData('channels');

export const store = createStore(
    reducers,
    persistedState,
    compose(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveData('channels', {
        channels: store.getState().channels
    });
});
