var gest = require('./gest.js')

train_samples = {
  'pos' : [
    'I love you mommy ! You are my amazing person',
    'I love you and you are a good person',
    'I win at everything and I want to love people',
    'good are things are heppening. gbu',
    'I am so rich',
    'I want to chase butterflies since they make me happy',
    'I want to hug bunnies',
    'You make me smile'
  ],
  'neg' : [
    'I fail at everything and I want to kill people',
    'sad are things are heppening. fml',
    'I hate you and you are a bad person',
    'I hate you mommy ! You are my terrible person',
    'I want to kill butterflies since they make me sad',
    'I want to hurt bunnies',
    'I am so poor',
    'You make me frown'
  ]
}

test_samples = [
  'You are a terrible person and everything you do is bad',
  'I love you all and you make me happy',
  'I frown whenever I see you in a poor state of mind',
  'Finally getting rich from my ideas. They make me smile.',
  'My mommy is poor',
  'I love butterflies. Yay for happy',
  'Everything is fail today and I hate stuff'
]

gest.train(train_samples)

console.log(gest.probdist)

test_samples.forEach(function(sample){
  var scores = gest.guess(sample)
  console.log(sample,scores);
})
