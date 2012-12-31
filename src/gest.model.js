(function(root) {

    var gest = (typeof require == 'function' && !(typeof define == 'function' && define.amd)) ? require('../src/gest.core.js') : root.gest

    /**
     * Creates instance of a gest Model. A gest Model is a combination of preprocessors,
     * classifiers, and classifier defitional data that can simplify the use of 
     * classifiers and preprocessors. Usually, you will be using something like:
     *
     * var sentiment_model = new Model(
     *   { classifier: "NaiveBayes"
     *   , preprocessors: [ "StringTokenizer"
     *   , classifierData: {  ...  }
     * })
     * sentiment_model.guess("This is a full string and it is a very good string")
     * // => { pos: 0.9, neg: 0.1 }
     * sentiment_model.guess("This is a another string that I am very fond of")
     * // => { pos: 0.8, neg: 0.1 }
     *
     * @constructor
     * @this {NaiveBayes}
     * @param {hash} opts JSON object with at least a "probdist" key mapped to a
     *   probability Distribution for the Bayes classifier with format 
     *   { probdist: { attribute: probability, ... } }
     */
    function Model(opts) {
        this.preprocessors = []
        for( var i=0; i<opts.preprocessors.length; i++) {
            // create instance of all our preprocessors
            this.preprocessors.push(new gest.preprocessors[opts.preprocessors[i]])
        }

        // create an instance of our classifier
        this.classifier = new gest.classifiers[opts.classifier](opts.classifierData)
    }

    /**
     * Return a best-guess prediction based on the given instance data.
     *
     * @this {NaiveBayes}
     * @param {hash} instance Hash of attributes and values, in the format
     *    { attribute: val, ... }
     */
    Model.prototype.guess = function(instance) {
        instance = this.preprocess(instance)

        // classify the preprocessed instance
        return this.classifier.classify(instance)
    }

    /**
     * Train this model with a batch of training instances
     *
     * @this {NaiveBayes}
     * @param {hash} instances Hash of labels and attributes, in the format
     *    { pos: { attribute: val, ... }
     *    , neg: { attribute: val, ... } }
     */
    Model.prototype.trainBatch = function(instances) {
        for (var label in instances) {
            for (var i=0; i<instances[label].length; i++) {
                instances[label][i] = this.preprocess(instances[label][i])
            }
        }

        this.classifier.trainBatch(instances)
    }

    /**
     * Run an instance through the chain of preprocessors
     *
     * @this {NaiveBayes}
     * @param {hash} instance Hash of attributes for a given instance of data
     * @return {hash} Modified / transformed instance data
     */
    Model.prototype.preprocess = function(instance) {
        // run the instance through the preprocessing chain
        this.preprocessors.forEach(function(p) {
            instance = p(instance)
        })
        return instance
    }

    // exports
    gest.Model = Model

})(this)
