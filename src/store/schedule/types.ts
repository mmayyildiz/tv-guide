import Schedule from "../../models/Schedule";

export const FETCH_SCHEDULE = 'FETCH_SCHEDULE';

interface FetchScheduleAction {
    type: typeof FETCH_SCHEDULE;
    payload: Schedule;
}

export type ActionTypes = FetchScheduleAction;