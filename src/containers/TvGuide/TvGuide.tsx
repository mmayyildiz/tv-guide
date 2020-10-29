import './style.css';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Event from '../../models/Event'
import Calendar from '../../components/Calendar/Calendar'
import { saveData, loadData } from '../../cache/localStorage';
import Channel from '../../models/Channel';
import { ChannelService } from '../../services/ChannelService';
import ChannelHeader from '../../components/ChannelHeader/ChannelHeader';
import ChannelSchedule from '../../components/ChannelSchedule/ChannelSchedule';
import moment from 'moment';
import { Program } from '../../models/Program';

interface Schedule {
    [sid: string]: Event[]
}

interface TvGuideProps {
    channels: Channel[];
}

const TvGuide = ({ channels }: TvGuideProps) => {

    const today = moment.utc().format('YYYYMMDD');

    const [schedules, setSchedules] = useState<{ [date: string]: Schedule }>({});
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false);

    const CHANNEL_LIMIT = 15;
    const channelListSize = channels.length;

    const selectedDate = useRef('20200129'); // useRef(today)
    const index = useRef(0);
    const prevY = useRef(0);
    const observer = useRef(
        new IntersectionObserver(
            entries => {
                const firstEntry = entries[0];
                const y = firstEntry.boundingClientRect.y;

                if (prevY.current > y) {
                    setTimeout(() => { loadMore(); }, 1000);
                }

                prevY.current = y;
            },
            { threshold: 1 }
        )
    );

    const updateSelectedDate = (date: string) => {
        selectedDate.current = date;
        prevY.current = 0;
        index.current = 0;
        fetchSchedules();
    }

    const fetchData = useCallback(
        async (beginingIndex) => {

            setLoading(true);
            const channelsToFetchSchedules = channels.slice(beginingIndex, beginingIndex + CHANNEL_LIMIT);
            const channelsWithEventsObj = await ChannelService.getInstance().fetchSchedulesByChannelList(selectedDate.current, channelsToFetchSchedules);
            return channelsWithEventsObj;
        }, []);


    const fetchSchedulesFromApi = useCallback(

        async (beginingIndex) => {
            const newSchedules = await fetchData(beginingIndex);
            // SAVE TO LOCAL STORAGE
            setSchedules((prevSchedules) => {
                const schedules = { ...prevSchedules[selectedDate.current], ...newSchedules };
                index.current = beginingIndex + CHANNEL_LIMIT;
                saveData(selectedDate.current, { remainingIndex: (beginingIndex + CHANNEL_LIMIT), schedules });
                return ({ [selectedDate.current]: schedules }) as { [date: string]: Schedule; }
            });
            setLoading(false);

        }, [fetchData]);


    const fetchSchedules = useCallback(() => {

        // LOOK INTO LOCAL STORAGE
        const scheduleForSelectedDate = loadData(selectedDate.current);

        if (scheduleForSelectedDate === undefined) {
            // FETCH FROM API
            fetchSchedulesFromApi(index.current);
        } else {

            // LOAD FROM CACHE
            const remainingIndex: number = scheduleForSelectedDate['remainingIndex'];
            index.current = remainingIndex;
            setSchedules({ [selectedDate.current]: scheduleForSelectedDate['schedules'] });
        }

    }, [fetchSchedulesFromApi])


    useEffect(() => {
        fetchSchedules();
    }, []);


    const loadMore = useCallback(() => {
        if (channelListSize > index.current) {
            fetchSchedulesFromApi(index.current);
        }
    }, [selectedDate]);

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [element]);

    return (
        <div>
            { Object.keys(schedules).length > 0 && (schedules[selectedDate.current] !== undefined) &&
                <div className="App tvguide" >
                    <header className="App-header">
                        <Calendar changeDate={(date: string) => updateSelectedDate(date)} selectedDate={selectedDate.current} />
                    </header>
                    <div className="tvg-grid__container">
                        <ChannelHeader channels={Object.keys(schedules[selectedDate.current])} />
                        <div className="tvg-grid__inner-container" id="sm-container">
                            <div className="tvg-grid" style={{ width: '64800px' }}>
                                <ul className="tvg-grid__programs">
                                    {Object.values(schedules[selectedDate.current]).map((schedule, index) =>
                                        <li key={index} className="tvg-grid__programs__line">
                                            {<ChannelSchedule events={schedule} />}
                                        </li>
                                    )}
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div ref={setElement} >
                    </div>
                </div>
            }
            {loading && <div> Loading ... </div>}

        </div>
    );
}

export default TvGuide;
