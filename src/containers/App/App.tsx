import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Channel from '../../models/Channel';
import { StoreState } from '../../store';
import TvGuide from '../TvGuide/TvGuide';
import { fetchChannels } from '../../store/channel/actions'
import './style.css'

interface AppProps {
    channels: Channel[];
    fetchChannels: Function
}

const App = ({ channels, fetchChannels }: AppProps) => {

    useEffect(() => {
        if (channels.length < 1) {
            fetchChannels();
        }
    }, []);

    return (
        channels.length > 0 ? <TvGuide channels={channels} /> : <div></div>
    );
}

const mapStateToProps = ({ channels }: StoreState): { channels: Channel[] } => {
    return { channels };
};

export default connect(mapStateToProps, { fetchChannels })(App);
