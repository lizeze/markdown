
import ElementProps from '../interface/Element'
let createElement = (tag: string, props: ElementProps): HTMLElement => {
    let options1: ElementCreationOptions = {}
    let el: HTMLElement = document.createElement(tag, options1);
    if (props.id)
        el.id = props.id
    if (props.text)
        el.innerText = props.text
    if (props.className)
        el.className = props.className
    return el;
}

 export {
     createElement
 }