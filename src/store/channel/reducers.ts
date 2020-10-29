import Channel from "../../models/Channel";
import { ActionTypes, FETCH_CHANNELS } from "./types";


export const channelReducer = (state: Channel[] = [], action: ActionTypes) => {
    switch (action.type) {
        case FETCH_CHANNELS:
            return action.payload;
        default:
            return state;
    }
}
