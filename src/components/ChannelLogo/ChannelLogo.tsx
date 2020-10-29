import React from 'react';
import { BASE_URL, GET_CHANNEL_IMAGE_URL } from '../../constants/serviceUrlConstants';

interface ChannelLogoProps {
    sid: string;
    size: string;
}

const ChannelLogo = ({ sid, size }: ChannelLogoProps) => {
    return (
        <img src={`${BASE_URL}${GET_CHANNEL_IMAGE_URL}/${sid}/${size}.png`} alt="1" />
    )
}

export default ChannelLogo;