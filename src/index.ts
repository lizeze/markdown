import { init } from "./init";
import * as $ from "jquery";
import * as marked from "marked";
import VNode from "./common//interface/Vnode";
import { h, patch } from "./snabbdom";

import { parseHTML } from "./common/util/HtmlParse";
init((html: string) => {
  console.log(html);
  let mdHTML = marked(html);
  let el: HTMLElement = (parseHTML(mdHTML) as Document).body;
  aaa(el);
  // $(".result").html(mdHTML);
});

function aaa(el: HTMLElement) {
  debugger
  let element: HTMLElement = document.getElementById("result") as HTMLElement;
  let list = [];
  el.childNodes.forEach((item) => {
    // if (item.nodeType !== 3) {
      let vnode = new VNode(item as HTMLElement);
      list.push(vnode._vNode);
    // }
  });

  let _vnode = h("div#result.result.markdown-body", {},el.innerHTML);
  patch(element, _vnode);

  //   console.log(patch(document.getElementById("result") as HTMLElement, vnode1));
}
