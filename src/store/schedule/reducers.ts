import Schedule from "../../models/Schedule";
import { ActionTypes, FETCH_SCHEDULE } from "./types";


export const scheduleReducer = (state: Schedule = { sid: '', date: '', events: [] }, action: ActionTypes) => {
    switch (action.type) {
        case FETCH_SCHEDULE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
