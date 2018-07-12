// Class that is used to extract context of some word

export default class ContextExtractor {
    
    // Returns a context for a current selection
    getContextForSelection() {
        if (window.getSelection().anchorNode === undefined) {
            return "";
        }
        
        const text = window.getSelection()
            .anchorNode.textContent
            .replace(/\n/g,"")
            .replace(/(\s)+/g, " ");

        return text;
    }
}