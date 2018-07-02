// Class that is used to extract context of some word

export default class ContextExtractor {

    constructor() {

    }
    
    // Returns a context for a current selection
    getContextForSelection() {
        const text = window.getSelection()
            .baseNode.parentNode.textContent
            .replace(/\n/g,"")
            .replace(/(\s)+/g, " ");

        return text;
    }
}