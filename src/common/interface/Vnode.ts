import ElementProps from "./Element";

import { h } from "../../snabbdom";
export default class VNode {
  el: HTMLElement;
  constructor(el: HTMLElement) {
    this.el = el;
    this.tag = el.tagName;
    this.props.id = el.id;
    this.props.className = el.className;
    this.innerHTML = el.innerText;
    this.getNodeList();
  }
  _vNode: any = {};
  tag: string = "";
  innerHTML: string = "";
  props: ElementProps = {};
  childNode: Array<any> = [];
  getNodeList = (): void => {
    this.childNode = [];
    this.el.childNodes.forEach((item) => {
      if (item.nodeType !== 3) {
        let vnode = new VNode(item as HTMLElement);
        let _vnode = h(getVnodeTag(vnode),{},vnode.innerHTML);
        this.childNode.push(_vnode);
      }
    });
    this._vNode = h(getVnodeTag(this), this.innerHTML)
  };
}

let getVnodeTag = (vnode: VNode): string => {
  let tag = "";
  tag += vnode.tag;
  if (vnode?.props?.id) tag += "#" + vnode.props.id;
  if (vnode?.props?.className) {
    vnode.props.className.split(" ").forEach((item) => {
      tag += "." + item;
    });
  }

  return tag;
};
