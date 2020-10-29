import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes, FETCH_CHANNELS } from './types';
import Channel from '../../models/Channel';
import { BASE_URL, FETCH_CHANNELS_URL } from '../../constants/serviceUrlConstants';

export const fetchChannels = () => {

    return async (dispatch: Dispatch) => {
        const response = await axios.get<Channel[]>(BASE_URL+FETCH_CHANNELS_URL);

        dispatch<ActionTypes>({
            type: FETCH_CHANNELS,
            payload: response.data
        });
    }
}

