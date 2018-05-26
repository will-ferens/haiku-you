const Twitter = require('twitter')
const config = require('./config.js')
const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const twiConfig = Twitter(config)
const app = express()


app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json('Sunshine and rainbows! 🌈 ☀️')
})


app.post('/user', (req, res) => {
    
    let userName = req.body.username
    let params = {
        screen_name: userName,
        include_rts: false,
        count: 200,
        exclude_replies: true
    }

    getTweets(params)    
    .then(value => {
        res.send(value)
    })
    .catch(err => {
        res.status(401).send(err.message)
    })
})

const getTweets = (searchParams) => {
    return new Promise ((resolve, reject) => {
        twiConfig.get('statuses/user_timeline', searchParams, (err, data, res) => {
            console.log(err)
            if(err) {
                reject(err)
            } else
            {
                let tweets = JSON.parse(res.body)
                let result = tweets.reduce((accumulater, current) => {
                    accumulater.push(current.text)
                    return accumulater
                }, [])
                resolve(result)
            }
        })
    })
}

app.post('/haiku', (req, res) => {

    let userHaiku = req.body.input

    const addLineBreaks = (string) => {
        return string.replace(/\,/g, '\n')
    }

    let formattedHaiku = addLineBreaks(userHaiku)

    let params = {status: formattedHaiku}

    postHaiku(params)
    .then(value => {
        res.send(value)
    })
    .catch(err => {
        res.send(err.message)
    })
})

const postHaiku = (tweetParams) => {
    return new Promise ((resolve, reject) => {
        twiConfig.post('statuses/update', tweetParams, (err, data, res) => {
            if(err){
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
    
}



app.listen(process.env.PORT || 8089)

