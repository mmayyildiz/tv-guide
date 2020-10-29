import React from 'react';
import Airing from '../Airing/Airing';
import Event from '../../models/Event';
import './style.css'

interface ChannelScheduleProps {
    events: Event[]
}

function ChannelSchedule({ events }: ChannelScheduleProps) {

    return (
        events &&
        <ul>
            {events.map((event, index) =>
                <li key={index} className="tvg-grid__program has-aired">
                    <Airing {...event} />
                </li>
            )}
        </ul>
    );
}

export default ChannelSchedule;
