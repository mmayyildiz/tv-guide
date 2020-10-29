import Event from './Event'

export default interface Schedule {
    sid: string;
    date: string;
    events: Event[]
}

