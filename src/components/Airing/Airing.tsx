import React, { useState } from 'react';
import Event from '../../models/Event';
import pixelWidth from 'string-pixel-width';
import moment from 'moment';
import AiringDetails from '../AiringDetails/AiringDetails';
import './style.css';

const Airing = (event: Event) => {

    const { st: startTime, d: duration, t: title } = event;

    const [width, setWidth] = useState((duration / 60) * 3);
    const [showPopup, setShowPopup] = useState(false);

    const eventStartTime = moment.utc(startTime);
    const eventEndTime = eventStartTime.add(duration, 'seconds');
    const activeEvent = moment.utc().isBetween(eventStartTime, eventEndTime);
    const eventHour = eventStartTime.format('hh:mm A');


    const onHover = () => {
        const titlePixel = pixelWidth(title, { size: 16, font: 'open sans' });
        if (titlePixel > width) {
            setWidth(titlePixel);
        }
    }

    const onLeave = () => {
        setWidth((duration / 60) * 3);
    }

    return (
        <React.Fragment>
            <div className='tvg-grid__program__inner'
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
                style={{ width: `${width}px`, backgroundColor: activeEvent ? 'grey' : 'white' }}
                onClick={() => setShowPopup(!showPopup)} >
                <span className='tvg-grid__program__start-time'>
                    {eventHour}
                </span>
                <span className='tvg-grid__program__title'>{title}</span>
            </div>

            {showPopup && <AiringDetails event={event} closePopup={() => setShowPopup(!showPopup)} />}
        </React.Fragment>
    );
}

export default Airing;