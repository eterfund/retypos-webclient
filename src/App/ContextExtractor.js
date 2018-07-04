// Class that is used to extract context of some word

export default class ContextExtractor {
    
    // Returns a context for a current selection
    getContextForSelection() {
        if (window.getSelection().baseNode === undefined) {
            return "";
        }
        
        const text = window.getSelection()
            .baseNode.parentNode.textContent
            .replace(/\n/g,"")
            .replace(/(\s)+/g, " ");

        return text;
    }
}