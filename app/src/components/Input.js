import React, { Component } from 'react'
import Output from './Output'
import '../App.css'
import _ from 'lodash'

class Input extends Component {
    constructor(props){
        super()
        this.state = {
            tweets: [],
            haiku: '',
        }
    }
    enterUser(event) {
        event.preventDefault()
        const user = {
            username: this.user.value
        }
        this.setState({user: this.user.value})
        fetch('http://localhost:8080/user', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(user)
        }).then((response, err) => {
            if(!err){
                return response.json()
            }
        })
        .then(tweets => {
            this.setState({tweets: tweets})
        })
    }
    getHaiku(event) {
        let tweet1 = _.sample(this.state.tweets)
        let tweet2 = _.sample(this.state.tweets)
        let tweet3 = _.sample(this.state.tweets)

        
        getHaiku(tweet1, 5)
        getHaiku(tweet2, 7)
        getHaiku(tweet3, 5)
        
    }
    
    
    render() {
        const getHaiku = function(string, syllables) {
            let yourHaiku = []
            if(string.match(/(?:https?|ftp):\/\/[\n\S]+/g)) {
                string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
                let matches = string.match(getHaiku.pattern)
                if (matches == null) return 0
                let currentSyllableCount = matches.length
                if (string.match(getHaiku.silentE) != null) currentSyllableCount -= string.match(getHaiku.silentEs).length
                
                if(syllables == 5){
                    let line = string.split(/\s+/g).slice(0, 4)
                    let haikuLine = line.join(' ')
                    yourHaiku.push(haikuLine)
                } else if(syllables == 7){
                    let line = string.split(/\s+/g).slice(0, 6)
                    let haikuLine = line.join(' ')
                    yourHaiku.push(haikuLine)
                }
            } else {
                let matches = string.match(getHaiku.pattern)
                if (matches == null) return 0
                let currentSyllableCount = matches.length
                if (string.match(getHaiku.silentE) != null) currentSyllableCount -= string.match(getHaiku.silentEs).length
                
                if(syllables == 5){
                    let line = string.split(/\s+/g).slice(0, 4)
                    let haikuLine = line.join(' ')
                    yourHaiku.push(haikuLine)
                } else if(syllables == 7){
                    let line = string.split(/\s+/g).slice(0, 6)
                    let haikuLine = line.join(' ')
                    yourHaiku.push(haikuLine)
                }
            } 
            console.log(yourHaiku) 
        }

        getHaiku.pattern  = new RegExp("[aeiouy]([^aieouy]|$)", 'gim') 
        getHaiku.silentE  = new RegExp("[aeiouy][^aeiouy]e([^a-z]s|[^a-z]|$)", 'i') 
        getHaiku.silentEs = new RegExp("[aeiouy][^aeiouy]e([^a-z]s|[^a-z]|$)", 'gim') 
        return (
        <section>
            <div className="input">
                <form ref={(input) => this.userForm = input} className="userName" onSubmit={(event) => this.enterUser(event)}>
                    <input ref={(input) => this.user = input} type="text" htmlFor="username" name="username" />
                    <input type="submit" id="submit-button" />
                </form>
                <button type="get" id="get-button" onClick={(event) => this.getHaiku(event)}>Generate a Haiku</button>
            </div>
            <div className="output">
                <ul>
                {
                    Object.keys(this.state.haiku)
                    .map(key => <Output key={key} haiku={this.state.haiku[key]}/>)
                }
                </ul>
            </div>
        </section>
        )
  }
}

export default Input

