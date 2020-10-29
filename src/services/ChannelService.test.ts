import { AxiosInstance } from 'axios'
import { mock } from 'jest-mock-extended'
import { FETCH_SCHEDULE_URL } from '../constants/serviceUrlConstants';
import Channel from '../models/Channel';
import Event from '../models/Event';
import Schedule from '../models/Schedule';
import { ChannelService } from './ChannelService';

const channelService = ChannelService.getInstance();

const mockAxiosInstance = mock<AxiosInstance>();
// @ts-ignore
channelService.axiosInstance = mockAxiosInstance;

describe('channelService test', () => {

    it('should fetch Channels', async () => {

        const channelList: Channel[] = [{
            sid: '2021',
            t: 'title',
            c: 'c',
            sf: 'sf',
            sg: 'sf'
        }];

        mockAxiosInstance.get.mockResolvedValue({ data: channelList });

        const result = await channelService.fetchChannels();
        expect(result).toMatchObject(channelList);

    })

    it('should not fetch Channels', async () => {

        mockAxiosInstance.get.mockResolvedValue(null);

        const result = await channelService.fetchChannels();
        expect(result).toMatchObject([]);

    })


    it('should fetch Schedule', async () => {

        const events: Event[] = [{
            eid: 'eid',
            st: 1,
            d: 1,
            t: 't',
            sy: 'sy',
            eg: 'eg',
            s: true,
            ad: true,
            hd: true,
            new: true
        }];

        const schedule: Schedule = {
            date: '20201025',
            sid: 'sid',
            events
        };

        mockAxiosInstance.get.mockReset();
        mockAxiosInstance.get.calledWith(`${FETCH_SCHEDULE_URL}/20201025/sid.json`).mockResolvedValue({ data: schedule });

        const result = await channelService.fetchSchedule('20201025', 'sid');
        expect(result).toMatchObject(schedule);

    })

    it('should not fetch Schedule', async () => {

        mockAxiosInstance.get.mockReset();
        mockAxiosInstance.get.calledWith(`${FETCH_SCHEDULE_URL}/20201025/sid.json`).mockResolvedValue(null);

        const result = await channelService.fetchSchedule('20201025', 'sid');
        expect(result).toBeUndefined();

    })

    it('should fetch channel with Schedule', async () => {

        const events: Event[] = [{
            eid: 'eid',
            st: 1,
            d: 1,
            t: 't',
            sy: 'sy',
            eg: 'eg',
            s: true,
            ad: true,
            hd: true,
            new: true
        }];

        mockAxiosInstance.get.mockReset();
        mockAxiosInstance.get.calledWith(`${FETCH_SCHEDULE_URL}/20201025/sid.json`).mockResolvedValue({ data: { events } });

        const result = await channelService.fetchChannelWithSchedule('20201025', 'sid');
        expect(result).toMatchObject({
            'sid': [{
                eid: 'eid',
                st: 1,
                d: 1,
                t: 't',
                sy: 'sy',
                seasonnumber: undefined,
                episodenumber: undefined
            }]
        });

    })

    it('should not fetch channel with Schedule', async () => {

        const events: Event[] = [undefined!];

        mockAxiosInstance.get.mockReset();
        mockAxiosInstance.get.calledWith(`${FETCH_SCHEDULE_URL}/20201025/sid.json`).mockResolvedValue({ data: { events } });

        const result = await channelService.fetchChannelWithSchedule('20201025', 'sid');
        expect(result).toMatchObject({});

    })

    it('should fetch Schedules By ChannelList', async () => {

        const channelList: Channel[] = [{
            sid: '2021',
            t: 'title',
            c: 'c',
            sf: 'sf',
            sg: 'sf'
        },
        {
            sid: '2022',
            t: 'title',
            c: 'c',
            sf: 'sf',
            sg: 'sf'
        }];

        const events: Event[] = [{
            eid: 'eid',
            st: 1,
            d: 1,
            t: 't',
            sy: 'sy',
            eg: 'eg',
            s: true,
            ad: true,
            hd: true,
            new: true
        }];

        mockAxiosInstance.get.mockReset();
        mockAxiosInstance.get.mockResolvedValue({ data: { events } });

        const result = await channelService.fetchSchedulesByChannelList('20201025', channelList);
        expect(result).toMatchObject({
            '2021': [{
                eid: 'eid',
                st: 1,
                d: 1,
                t: 't',
                sy: 'sy',
                seasonnumber: undefined,
                episodenumber: undefined
            }],
            '2022': [{
                eid: 'eid',
                st: 1,
                d: 1,
                t: 't',
                sy: 'sy',
                seasonnumber: undefined,
                episodenumber: undefined
            }]
        });

    })

    it('should not fetch Schedules By undefined ChannelList', async () => {

        const result = await channelService.fetchSchedulesByChannelList('20201025', undefined!);
        expect(result).toMatchObject({});

    })

})