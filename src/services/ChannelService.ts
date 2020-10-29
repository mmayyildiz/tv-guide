import axios, { AxiosInstance } from 'axios';
import { BASE_URL, FETCH_CHANNELS_URL, FETCH_SCHEDULE_URL } from '../constants/serviceUrlConstants';
import Channel from '../models/Channel';
import Event from '../models/Event';
import { Program } from '../models/Program';
import Schedule from '../models/Schedule';

export class ChannelService {

    private static instance: ChannelService;
    private readonly axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    static getInstance(): ChannelService {
        if (!ChannelService.instance) {
            ChannelService.instance = new ChannelService();
        }

        return ChannelService.instance;
    }

    async fetchChannels(): Promise<Channel[]> {
        let channels: Channel[] = [];

        try {
            const response = await this.axiosInstance.get<Channel[]>(FETCH_CHANNELS_URL);
            channels = response.data;

        } catch (error) {
            console.log('fetchChannels - ERROR : ' + error);
        }

        return channels;
    }

    async fetchSchedule(date: string, sid: string): Promise<Schedule> {

        let schedule: Schedule;

        try {
            const response = await this.axiosInstance.get<Schedule>(`${FETCH_SCHEDULE_URL}/${date}/${sid}.json`);
            schedule = response.data;

        } catch (error) {
            console.log('fetchSchedule - ERROR :' + error);
        }

        return schedule!;
    }

    async fetchChannelWithSchedule(date: string, sid: string): Promise<Program> {

        let res: Program = {};

        try {
            const response = await this.axiosInstance.get<Schedule>(`${FETCH_SCHEDULE_URL}/${date}/${sid}.json`);
            const reducedEvents: Partial<Event>[] = response.data.events.map(event => (
                {
                    eid: event.eid,
                    st: event.st,
                    d: event.d,
                    t: event.t,
                    sy: event.sy,
                    seasonnumber: event.seasonnumber,
                    episodenumber: event.episodenumber
                }
            ));

            res = { [sid]: reducedEvents };

        } catch (error) {
            console.log('fetchChannelWithSchedule - ERROR :' + error);
        }

        return res;
    }

    async fetchSchedulesByChannelList(date: string, channelList: Channel[]): Promise<Program> {

        let schedulesObj: Program = {};

        try {
            await Promise.all(channelList.map(async ({ sid }) => {
                const reducedEvents = await this.fetchChannelWithSchedule(date, sid);
                schedulesObj = { ...schedulesObj, ...reducedEvents }
            }));

        } catch (error) {
            console.log('fetchSchedulesByChannelList - ERROR :' + error);
        }

        return schedulesObj;
    }

}