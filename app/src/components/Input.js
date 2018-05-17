import React, { Component } from 'react'
import Output from './Output'
import '../App.css'
import _ from 'lodash'

class Input extends Component {
    constructor(props){
        super()
        this.state = {
            tweets: [],
            haiku: [],
            hidden: true,
            visible: false,
            user: ''
        }
    }
    enterUser(event) {
        event.preventDefault()
        const user = {
            username: this.user.value
        }
        this.setState({user: this.user.value})
        fetch('http://localhost:8089/user', {
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
            this.setState({
                tweets: tweets,
                hidden: false,
            })
        })
    }
    
    getHaiku = (array) => {
        
        let tweet1 = _.sample(array)
        let tweet2 = _.sample(array)
        let tweet3 = _.sample(array)

        let line1 = createHaiku5(tweet1)
        let line2 = createHaiku7(tweet2)
        let line3 = createHaiku5(tweet3)

        let yourHaiku = [line1, line2, line3]

        this.setState({
            haiku: yourHaiku,
            visible: true
        })
        console.log(this.state.haiku)
        function createHaiku5(tweet) {
            let pattern  = /[aeiouy]([^aieouy]|$)/gim
            let silentE  = /[aeiouy][^aeiouy]e([^a-z]s|[^a-z]|$)/i
            let silentEs = /[aeiouy][^aeiouy]e([^a-z]s|[^a-z]|$)/gim 
    
            let matches = tweet.match(pattern)
            if (matches == null) return 0
            let currentSyllableCount = matches.length
            if (tweet.match(silentE) != null) currentSyllableCount -= tweet.match(silentEs).length
            
            let line = tweet.split(/\s+/g).slice(0, 4)
            let haikuLine = line.join(' ')

            return haikuLine
        }
        
        function createHaiku7(tweet) {
            let pattern  = /[aeiouy]([^aieouy]|$)/gim
            let silentE  = /[aeiouy][^aeiouy]e([^a-z]s|[^a-z]|$)/i
            let silentEs = /[aeiouy][^aeiouy]e([^a-z]s|[^a-z]|$)/gim 
    
            let matches = tweet.match(pattern)
            if (matches == null) return 0
            let currentSyllableCount = matches.length
            if (tweet.match(silentE) != null) currentSyllableCount -= tweet.match(silentEs).length
    
            let line = tweet.split(/\s+/g).slice(0, 6)
            let haikuLine = line.join(' ')

            return haikuLine
        }
    }

    // CRUD functionality on username, second table tweets sent
    
    render() {
        return (
        <section className="user-side">
            <div className="input">
                <form ref={(input) => this.userForm = input} className="userName" onSubmit={(event) => this.enterUser(event)}>
                    <input ref={(input) => this.user = input} type="text" htmlFor="username" name="username" />
                    <input type="submit" id="submit-button" />
                </form>
                {this.state.hidden ? "" : <button type="get" id="get-button" onClick={() => this.getHaiku(this.state.tweets)}>Generate a Haiku</button>}
            </div>
                <Output haiku={this.state.haiku} visible={this.state.visible}/>
        </section>
        )
    }
}

export default Input

