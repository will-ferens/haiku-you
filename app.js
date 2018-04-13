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
app.delete('/haiku', (req, res) => {
    res.json('Deleted!')
})

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
    getTweets(params)
})
let arrayOfLines = []
const getTweets = function(searchParams){
    twiConfig.get('statuses/user_timeline', searchParams, (err, data, res) => {
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
           
            getHaiku(tweet1, 5)
            getHaiku(tweet2, 7)
            getHaiku(tweet3, 5)
            
            arrayOfLines.push(searchParams.screen_name)
            serveHaiku(arrayOfLines)
        }
        
    })
}
const getHaiku = function(string, syllables) {
    scrubLinks(string)
    
    let matches = string.match(getHaiku.pattern)
    if (matches == null) return 0
    let currentSyllableCount = matches.length
    if (string.match(getHaiku.silentE) != null) currentSyllableCount -= string.match(getHaiku.silentEs).length
    
    if(syllables == 5){
        let line = string.split(/\s+/g).slice(0, 4)
        let haikuLine = line.join(' ')
        arrayOfLines.push(haikuLine)
    } else if(syllables == 7){
        let line = string.split(/\s+/g).slice(0, 6)
        let haikuLine = line.join(' ')
        arrayOfLines.push(haikuLine)
    }
    
}
const scrubLinks = function(string) {
    if(string.match(/(?:https?|ftp):\/\/[\n\S]+/g)) {
        string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
      return string
    } else {
      return string
    }
}

getHaiku.pattern  = new RegExp("[aeiouy]([^aieouy]|$)", 'gim') 
getHaiku.silentE  = new RegExp("[aeiouy][^aeiouy]e([^a-z]s|[^a-z]|$)", 'i') 
getHaiku.silentEs = new RegExp("[aeiouy][^aeiouy]e([^a-z]s|[^a-z]|$)", 'gim') 

const serveHaiku = function(haiku) {
    app.get('/haiku', (req, res) => {
        res.json(haiku)
    })
}

app.listen(process.env.PORT || 8080)
