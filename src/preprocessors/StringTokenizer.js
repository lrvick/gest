(function(root) {

    var gest = (typeof require == 'function' && !(typeof define == 'function' && define.amd)) ? require('../src/gest.core.js') : root.gest

    /**
     * Creates instance of StringTokenizer preprocessor
     * It mostly splits strings into words and removes stopwords
     *
     * @constructor
     * @this {StringTokenizer}
     * @param {hash} opts JSON object with configuration parameters for this tokenizer
     */
    function StringTokenizer(opts) {
        if( typeof opts != 'object' ) {
            opts = {}
        }

        // if no stopwords are specified, use the default
        if ( !('stopwords' in opts) ) {
            opts.stopwords = StringTokenizer.stopwords
        }

        return function(str) {
            var tokens = {}

            str.split(' ').forEach(function(token){
                var token = token.toLowerCase()
                if (opts.stopwords.indexOf(token) == -1 && /^[a-zA-Z0-9]+$/.test(token)){
                    // TODO: make this a word count or something?
                    tokens[token] = 1
                }
            })

            return tokens
        }
    }

    StringTokenizer.stopwords = [
        "i","me","my","myself","we","our","ours","ourselves",
        "you","your","yours","yourself","yourselves","he","him","his",
        "himself","she","her","hers","herself","it","its","itself",
        "they","them","their","theirs","themselves","what","which",
        "who","whom","this","that","these","those","am","is","are",
        "was","were","be","been","being","have","has","had","having",
        "do","does","did","doing","a","an","the","and","but","if",
        "or","because","as","until","while","of","at","by","for",
        "with","about","against","between","into","through","during",
        "before","after","above","below","to","from","up","down","in",
        "out","on","off","over","under","again","further","then",
        "once","here","there","when","where","why","how","all","any",
        "both","each","few","more","most","other","some","such","no",
        "nor","not","only","own","same","so","than","too","very","s",
        "t","can","will","just","don","should","now"
    ]



    gest.preprocessors.StringTokenizer = StringTokenizer

})(this)
