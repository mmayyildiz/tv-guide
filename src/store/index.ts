import { combineReducers } from 'redux';
import Channel from '../models/Channel';
import Schedule from '../models/Schedule';
import { channelReducer } from './channel/reducers';
import { scheduleReducer } from './schedule/reducers';

export interface StoreState {
    channels: Channel[];
    schedule: Schedule
}

export const reducers = combineReducers<StoreState>({
    channels: channelReducer,
    schedule: scheduleReducer
});
