export default interface Event {

    eid: string;
    st: number;
    d: number;
    t: string;
    sy: string;
    eg: string;
    esg?: string;
    seasonnumber?: number;
    episodenumber?: number;
    programmeuuid?: string;
    seasonuuid?: string;
    seriesuuid?: string;
    r?: string;
    s: boolean;
    ad: boolean;
    hd: boolean;
    new: boolean;

}