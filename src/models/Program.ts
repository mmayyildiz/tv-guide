import Event from './Event'

export interface Program {
    [sid: string]: Partial<Event>[]
}