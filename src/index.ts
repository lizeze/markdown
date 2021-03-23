import {init} from "./init";
import * as $ from "jquery";
import * as marked from "marked";
import VNode from "./common//interface/Vnode";
import {h, patch} from "./snabbdom";

import {parseHTML} from "./common/util/HtmlParse";

init((html: string) => {
    console.log(html);
    let mdHTML = marked(html);
    let el: HTMLElement = (parseHTML(mdHTML) as Document).body;
    xxx(el);
    // $(".result").html(mdHTML);
});
let oldNode = null

function xxx(el) {

    let vNode = bbb(el, true)
    let element: HTMLElement = document.getElementById("result") as HTMLElement;
    if (oldNode)
        patch(oldNode, vNode);
    else {
        patch(element, vNode)
    }
    oldNode = vNode
}


function bbb(item, root) {
    let el = {el: null, nodes: []}
    el.el = item

    if (item && item.childNodes) {
        // if (!root) {
        //     let html = el.el.textContent
        //     if (html)
        //         el.nodes.push(h('span', {}, html))
        // }
        item.childNodes.forEach(node => {
            if (node.nodeType !== 3)
                el.nodes.push(bbb(node, false))
        })
    }

    let elementTag = ''
    if (root)
        elementTag = '#result.result.markdown-body'
    else {

        if (el.el.id)
            elementTag += '#' + el.el.id
        if (el.el.className) elementTag += '.' + el.el.className.split(' ').join('.')
    }
    let attr = {
        props: {src: '', textContent: ''}
    }
    if (el.el.nodeName.toLowerCase() === 'img') {
        attr.props.src = el.el.src
    }
    // attr.props.textContent = el.el.textContent || ''
    let tagName = el.el.nodeName.toLowerCase() === 'body' ? 'div' : el.el.nodeName
    // return h(tagName + elementTag, attr, el.nodes.length > 0 ? el.nodes : el.el.innerHTML || el.el.textContent);
    return h(tagName + elementTag, attr, el.nodes.length > 0 ? el.nodes : el.el.innerHTML || el.el.textContent);

}


