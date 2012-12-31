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
        if (typeof opts != "object") opts = {}

        if ('probdist' in opts) {
            this.probdist = opts.probdist
        }
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
     * Train a new instance into the classifier. The instance parameter is expected
     * to already have been through a preprocessor.
     * 
     * @param {hash} labeldata Hash with labels and keys and attributes-hashes as 
     *    values, ex:
     *      { pos: { attribute: value, ... }
     *      , neg: { attribute: value, ... } }
     *    Attributes that are in the classifier's list but not in this list
     *    will be treated as 0. Attributes that are in this list but not in the 
     *    classifier will be added.
     */
    NaiveBayes.prototype.trainBatch = function(instances) {
        var tokens = {}
        var totals = {}

        for (var label in instances) {
            tokens[label] = {}
            totals[label] = 0
            
            instances[label].forEach(function(attributes) {
                for (var attribute in attributes) {
                    // TODO: handle attributes better.
                    // Bayes should be able to handle numeric attributes,
                    // boolean attributes, nominal attributes, ...
                    // for now I'm just assuming that if it exists in the hash
                    // and has a value that is not 0 it is intended as a 1
                    if (attributes[attribute] != 0) {
                        tokens[label][attribute] = tokens[label][attribute] || {'c': 0}
                        tokens[label][attribute]['c']++
                        totals[label]++
                    }
                }
            })
        }

        this.probdist = this.calculateProbdist(tokens, totals)

        return this.probdist
    }

    /**
     * Calculate the probability distribution for tokens by labels
     * 
     * @param {hash} instance Hash of attributes with format { attribute: value, 
     *    ... }. Attributes that are in the classifier's list but not in this list
     *    will be treated as 0. Attributes that are in this list but not in the 
     *    classifier will be added.
     * @param {string} label The name of the label that was externally found to be 
     *    associated with this instance
     */
    NaiveBayes.prototype.calculateProbdist = function(tokens, totals) {
        Object.keys(tokens).forEach(function(label) {
            for (token in tokens[label]) {
                var prob = tokens[label][token]['c'] / totals[label]
                tokens[label][token]['p'] = prob
            }
        })

        return tokens
    }
    

    gest.classifiers.NaiveBayes = NaiveBayes

})(this)
