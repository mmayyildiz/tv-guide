import React from 'react';
import { Size } from '../../constants/sizeConstants';

import ChannelLogo from '../ChannelLogo/ChannelLogo';
import './style.css';

interface ChannelHeaderProps {
    channels: string[];
}

function ChannelHeader({ channels }: ChannelHeaderProps) {

    return (
        <ul className="tvg-channel-list" >
            { channels.map((sid, index) =>
                <li key={index}>
                    <div>
                        <span>{index}</span>
                        <ChannelLogo sid={sid} size={Size["100PX"]} />
                    </div>
                </li>
            )
            }
        </ul>
    )

}

export default ChannelHeader;