import axios from 'axios';
import { Dispatch } from 'redux';
import { BASE_URL, FETCH_SCHEDULE_URL } from '../../constants/serviceUrlConstants';
import Schedule from '../../models/Schedule';
import { ActionTypes, FETCH_SCHEDULE } from './types';

export const fetchSchedule = (date: string, sid: string) => {

    return async (dispatch: Dispatch) => {

        const response = await axios.get<Schedule>(`${BASE_URL}${FETCH_SCHEDULE_URL}/${date}/${sid}.json`);

        dispatch<ActionTypes>({
            type: FETCH_SCHEDULE,
            payload: response.data
        })
    }
}