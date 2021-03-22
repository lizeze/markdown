
import ElementProps from "./common/interface/Element";
import { createElement } from './common/util/ElementUtil';
import './style/style.scss'
import $ from "jquery";
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
        className: 'result',
        id:'result'
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

export {
    init
}
