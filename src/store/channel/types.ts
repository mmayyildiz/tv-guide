import Channel from "../../models/Channel";

export const FETCH_CHANNELS = 'FETCH_CHANNELS';

interface FetchChannelsAction {
    type: typeof FETCH_CHANNELS;
    payload: Channel[]
}

export type ActionTypes = FetchChannelsAction;