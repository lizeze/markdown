import {init,render} from "./init";
import * as marked from "marked";

import {parseHTML} from "./common/util/HtmlParse";

init((html: string) => {
    console.log(html);
    let mdHTML = marked(html);
    let el: HTMLElement = (parseHTML(mdHTML) as Document).body;
    render(el);
});




