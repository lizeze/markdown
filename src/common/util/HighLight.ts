const hljs = require('highlight.js/lib/index');
// const javascript = require('highlight.js/lib/languages/javascript');
// hljs.registerLanguage('javascript', javascript);
const highlight = (item: HTMLElement) => {
    debugger
    hljs.highlightBlock(item)
}

export { highlight }