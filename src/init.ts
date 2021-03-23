import ElementProps from "./common/interface/Element";
import {createElement} from './common/util/ElementUtil';
import './style/style.scss'
import './style/fancy.scss'
import * as $ from "jquery";
import {h, patch} from "./snabbdom";


let createEditor = (): HTMLElement => {
    let editor: ElementProps = {
        className: 'editor'
    }
    let $editor = createElement('div', editor);
    return createInput($editor)
}
let createInput = (parent: HTMLElement): HTMLElement => {

    let editor: ElementProps = {
        id: 'textMD'
    }
    let input = createElement('textarea', editor);
    parent.appendChild(input)
    return parent
}

function throttle(callback: Function) {
    // 上一次点击的时间
    let preTime = Date.now();
    return function () {
        let args = arguments;
        // 现在点击时间
        let now = Date.now();
        // 现在点击的时间跟上一次点击的时间如果超过了一秒,执行回调
        if (now - preTime >= 1000) {
            callback(args);
            // 从新计时,这次点击的时间成为下一次点击时间的起点
            preTime = now;
        }
    }
}

let createResult = (): HTMLElement => {
    let result: ElementProps = {
        className: 'result markdown-body',
        id: 'result'
    }
    return createElement('div', result)
}


let init = (callback: Function) => {
    let root: ElementProps = {
        id: 'page',
        className: 'page',
    }
    let $root = createElement('div', root);

    $root.appendChild(createEditor())
    $root.appendChild(createResult())
    document.body.append($root)
    eventBind(callback)
}

let eventBind = (callback: Function) => {
    let flag = false;
    let input: HTMLElement = <HTMLElement>document.getElementById('textMD')
    input.addEventListener('compositionstart', function (e) {
        flag = true
    }, false)

    input.addEventListener('compositionend', function (e) {
        flag = false;
        callback && callback($('#textMD').val())
    }, false);


    input.oninput = function () {
        if (!flag)
            callback && callback($('#textMD').val())
    }
}

const clearTextNode = ['pre', 'blockquote']
const clearNode = (item: HTMLElement): string => {
    if (clearTextNode.indexOf(item.nodeName.toLowerCase()) > -1) {
        return ''
    }
    if (item.nodeName.toLowerCase() === 'p') {
        if (item.childNodes.length == 1 && item.childNodes[0].nodeName.toLowerCase() === 'strong') {

            return ''
        }

    }
    return item.textContent
}

let oldNode = null


const getNode = (item: HTMLElement, root: boolean) => {
    let el = {el: null, nodes: []}
    el.el = item
    if (item && item.childNodes) {
        if (!root) {
            el.nodes.push(clearNode(item))
        }
        item.childNodes.forEach(node => {
            if (node.nodeType !== 3)
                el.nodes.push(getNode(node as HTMLElement, false))
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
    let tagName = el.el.nodeName.toLowerCase() === 'body' ? 'div' : el.el.nodeName
    return h(tagName + elementTag, attr, el.nodes);
}
const render = (el) => {
    let vNode = getNode(el, true)
    let element: HTMLElement = document.getElementById("result") as HTMLElement;
    if (oldNode)
        patch(oldNode, vNode);
    else {
        patch(element, vNode)
    }
    oldNode = vNode
}
export {
    init,
    render
}
