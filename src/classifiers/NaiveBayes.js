(function(root) {

    var gest = (typeof require == 'function' && !(typeof define == 'function' && define.amd)) ? require('../src/gest.core.js') : root.gest

    /**
     * Creates instance of NaiveBayes classifier from provided probdist
     *
     * @constructor
     * @this {NaiveBayes}
     * @param {hash} opts JSON object with at least a "probdist" key mapped to a
     *   probability Distribution for the Bayes classifier with format 
     *   { probdist: { attribute: probability, ... } }
     */
    function NaiveBayes(opts) {
        this.probdist = opts.probdist
        // attributes
        // labels
        // probdist
        
    }

    /**
     * Classify an instance
     * 
     * @param {hash} instance Hash of attributes with format { attribute: value, 
     *    ... }. Attributes that are in the classifier's list but not in this list
     *    will be treated as 0. Attributes that are in this list but not in the 
     *    classifier will be ignored.
     * @returns {hash} Mapping between this classifier's output labels and the
     *    probability of those labels being chosen for this instance
     */
    NaiveBayes.prototype.classify = function(instance) {
        var scores = {}

        for (var label in this.probdist) {
            scores[label] = 0
            for (var attr in instance) {
                if (attr in this.probdist[label]) {
                    scores[label] += this.probdist[label][attr]['p']
                }
            }
        }

        return scores
    }

    /**
     * Train a new instance into the classifier. The instance parameter is expeced
     * to already have been through a preprocessor.
     * 
     * @param {hash} instance Hash of attributes with format { attribute: value, 
     *    ... }. Attributes that are in the classifier's list but not in this list
     *    will be treated as 0. Attributes that are in this list but not in the 
     *    classifier will be added.
     * @param {string} label The name of the label that was externally found to be 
     *    associated with this instance
     */
    NaiveBayes.prototype.train = function(instance, label) {
        
    }

    gest.classifiers.NaiveBayes = NaiveBayes

})(this)
