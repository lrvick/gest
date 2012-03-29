var gest = (function(){

    var stopwords = ['i','in','and','to','are','the','but','my','they','those','them','you','a']

    // take input text and output an array of alphanumeric non-stopword tokens
    function tokenize(sample){

        var tokens = []

        sample.split(' ').forEach(function(token){
            if (gest.stopwords.indexOf(token) & /^[a-zA-Z0-9]+$/.test(token)){
                tokens.push(token.toLowerCase())
            }
        })

        return tokens
    }

    // calculate probability distribution for each token by labels
    function probdist(tokens,totals){
        Object.keys(tokens).forEach(function(label){
            for (token in tokens[label]){
                var prob = tokens[label][token]['c'] / totals[label]
                tokens[label][token]['p'] = prob;
            }
        });

        return tokens
    }

    // take a sample text string, then output the label probabilities
    function guess(sample){

        scores = {}
        Object.keys(gest.samples).forEach(function(label){
            scores[label] = 0
            tokenize(sample).forEach(function(token){
                var prob = gest.probdist[label][token] || {'p': 0}
                scores[label] = scores[label] + prob['p']
            })
        })

        return scores
    }

    // count all tokens in all samples by label
    function train(samples){

        gest.samples = samples

        var tokens = {}
        var totals = {}

        Object.keys(samples).forEach(function(label){
            tokens[label] = {}
            totals[label] = 0
            samples[label].forEach(function(sample){
                tokenize(sample).forEach(function(token){
                    tokens[label][token] = tokens[label][token] || {'c': 0}
                    tokens[label][token]['c'] = tokens[label][token]['c'] + 1
                    totals[label] = totals[label] + 1
                })
            })
        });

        gest.probdist = probdist(tokens,totals)

        return gest.probdist

    }

    return {
        guess : guess,
        train : train,
        stopwords : stopwords,
    }

}())
