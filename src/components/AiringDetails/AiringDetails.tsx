import React from 'react';
import Event from '../../models/Event';
import moment from 'moment';
import './style.css';

interface AiringDetailsProp {
    event: Event;
    closePopup: Function;
}

const AiringDetails = ({ event, closePopup }: AiringDetailsProp) => {

    const { st: startTime, d: duration, t: title,
        sy: detail, eg: eventType,
        seasonnumber, episodenumber } = event;


    const eventStartTime = moment.utc(startTime);
    const eventHour = eventStartTime.format('hh:mm a');
    const eventDay = eventStartTime.format('dddd');

    const length = moment.utc(duration * 1000).format('hh:mm').split(':');

    return (
        <div className="popup">
            <button className="popup__close" onClick={() => closePopup()}>
                &times;
            </button>
            <div className="popup__content">
                <div className="popup__title">{title}</div>
                <br />
                <div>{eventDay} {eventHour}</div>
                <br />
                <div>Season {seasonnumber} | Episode {episodenumber} | Length : {length[0]} hour {length[1]} minutes </div>
                <br />
                <div>{eventType}</div>
                <br />
                <div>{detail}</div>
                <br />
            </div>
        </div>
    );
}

export default AiringDetails;