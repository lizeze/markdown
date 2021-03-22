let parseHTML = (html: string): Document => {
    let parser = new DOMParser();


    return parser.parseFromString(html, 'text/html')

}

export {
    parseHTML
}