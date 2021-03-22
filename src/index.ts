import { init } from './init'
import * as $ from 'jquery';
import  * as  marked from 'marked'
// import VNode from './common//interface/Vnode'
// import { h, patch } from './snabbdom'

import { parseHTML } from './common/util/HtmlParse'
init((html: string) => {
    console.log(html);
    let mdHTML = marked(html)
    // console.log(
    //     (parseHTML(mdHTML)as Document).body)
    $('.result').html(mdHTML)
})


// window["a"] = function () {
//     let element: HTMLElement = document.getElementById('result') as HTMLElement
//     let vnode = new VNode(element)
//     vnode.getNodeList()


//     const vnode1 = h('div#container.two.classes'
//     )
//     console.log(patch(document.getElementById('result') as HTMLElement, vnode1))

// }


