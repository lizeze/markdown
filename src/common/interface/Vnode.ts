import ElementProps from "./Element"

export default class VNode {
    el: HTMLElement
    constructor(el: HTMLElement) {
        this.el = el
        this.tag = el.tagName
        this.props.id = el.id
        this.props.className = el.className
        this.innerHTML = el.innerHTML
        this.getNodeList()

    }
    tag: string = ''
    innerHTML: string = ''
    props: ElementProps = {}
    childNode: Array<VNode> = []
    getNodeList = (): void => {
        this.childNode = []
        this.el.childNodes.forEach(item => {
            if (item.nodeType !== 3) {
                let vnode = new VNode(item as HTMLElement)
                this.childNode.push(vnode)
            }
        })
    }

}