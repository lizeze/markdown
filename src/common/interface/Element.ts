import EventMap from "./EventMap";

export default interface ElementProps {

    id?: string,
    html?: string,
    text?: string,
    attr?: string,
    className?: string,
    childNode?: Array<HTMLElement>,
     on?:Array<EventMap>
    

}