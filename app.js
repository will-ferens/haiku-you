const Twitter = require('twitter')
const config = require('./config.js')
const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const _ = require('lodash')
const morgan = require('morgan')

const haikus = require('./routes/haikus')

const twiConfig = Twitter(config)
const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/haikus', haikus)

app.get('/', (req, res) => {
    res.json('Sunshine and rainbows! 🌈 ☀️')
})

const arrayOfLines = []

app.post('/user', (req, res) => {
    let userInput = req.body
    res.send(userInput)
    let userName = userInput.username

    let params = {
        screen_name: userName,
        include_rts: false,
        count: 200,
        exclude_replies: true
    }

    twiConfig.get('statuses/user_timeline', params, (err, data, res) => {
        console.log(err)
        if(!err) {
            let tweets = JSON.parse(res.body)
            let result = tweets.reduce((accumulater, current) => {
                accumulater.push(current.text)
                return accumulater
            }, [])
            
            let tweet1 = _.sample(result)
            let tweet2 = _.sample(result)
            let tweet3 = _.sample(result)
            
            const getHaiku = function(string, syllables) {
                let scrubbed = string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
    
                let matches = scrubbed.match(getHaiku.pattern)
                if (matches == null) return 0 // No vowels found...
                let currentSyllableCount = matches.length
                if (scrubbed.match(getHaiku.silentE) != null) currentSyllableCount -= scrubbed.match(getHaiku.silentEs).length
                
                if(syllables == 5){
                    let line = scrubbed.split(/\s+/g).slice(0, 4)
                    let haikuLine = line.join(' ')
                    
                    arrayOfLines.push(haikuLine)
                } else if(syllables == 7){
                    let line = scrubbed.split(/\s+/g).slice(0, 6)
                    let haikuLine = line.join(' ')
                    
                    arrayOfLines.push(haikuLine)
                   
                }
            }
            
            getHaiku.pattern  = new RegExp("[aeiouy]([^aieouy]|$)", 'gim'); // Vowel followed be non-vowel or end of string. Matches all in multi-line string, case insensitively.
            getHaiku.silentE  = new RegExp("[aeiouy][^aeiouy]e([^a-z]s|[^a-z]|$)", 'i'); // words ending vce / vces where v is some vowel, c is some consonant
            getHaiku.silentEs = new RegExp("[aeiouy][^aeiouy]e([^a-z]s|[^a-z]|$)", 'gim'); // as above, but match all in multi=line string (previous matches only first - used to find if there are any quickly)
            
            getHaiku(tweet1, 5)
            getHaiku(tweet2, 7)
            getHaiku(tweet3, 5)
            
            arrayOfLines.push(userName)
            serveHaiku(arrayOfLines)
            }              
    })
})

const serveHaiku = function(haiku) {
    app.get('/haiku', (req, res) => {
        res.json(haiku)
    })
}

//break syllable count into one function called 3 times - params with tweet and syllable count
//joiner function making haiku one string






app.listen(process.env.PORT || 8080)


