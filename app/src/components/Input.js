import React, { Component } from 'react'
import Output from './Output'
import TwitterStream from './TwitterStream'
import Instructions from './Instructions'

import _ from 'lodash'

class Input extends Component {
    constructor(props){
        super()
        this.state = {
            tweets: [],
            haiku: [],
            hiddenEditButton: true,
            visibleHaiku: false,
            user: '',
            error: '',
            renderInstructions: 1
        }
    }
    enterUser(event) {
        event.preventDefault()
        const user = {
            username: this.user.value
        }
        this.setState({
            user: this.user.value,
        })
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
        .then((tweets, err) => {
            if(!err)
                this.setState({
                tweets: tweets,
                hiddenEditButton: false,
                error: 'none'
            })
        })
        .catch(err => {
            this.setState({
                error: 'error',
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
            visibleHaiku: true,
            renderInstructions: 2
        })

        function createHaiku5(tweet) {
            let scrubbedLink = scrubLinks(tweet)

            let pattern  = /[aeiouy]([^aieouy]|$)/gim
            let silentE  = /[aeiouy][^aeiouy]e([^a-z]s|[^a-z]|$)/i
            let silentEs = /[aeiouy][^aeiouy]e([^a-z]s|[^a-z]|$)/gim 
    
            let matches = scrubbedLink.match(pattern)
            if (matches == null) return 0
            let currentSyllableCount = matches.length
            if (scrubbedLink.match(silentE) != null) currentSyllableCount -= scrubbedLink.match(silentEs).length
            
            let line = scrubbedLink.split(/\s+/g).slice(0, 4)
            let haikuLine = line.join(' ')

            return haikuLine
        }
        
        function createHaiku7(tweet) {
            let scrubbedLink = scrubLinks(tweet)

            let pattern  = /[aeiouy]([^aieouy]|$)/gim
            let silentE  = /[aeiouy][^aeiouy]e([^a-z]s|[^a-z]|$)/i
            let silentEs = /[aeiouy][^aeiouy]e([^a-z]s|[^a-z]|$)/gim 
    
            let matches = scrubbedLink.match(pattern)
            if (matches == null) return 0
            let currentSyllableCount = matches.length
            if (scrubbedLink.match(silentE) != null) currentSyllableCount -= scrubbedLink.match(silentEs).length
    
            let line = scrubbedLink.split(/\s+/g).slice(0, 6)
            let haikuLine = line.join(' ')

            return haikuLine
        }

        function scrubLinks(string){
            let linkPattern = /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim
            
            return string.replace(linkPattern, '')
        }
    }
    
    errorHandle(error) {
        switch(error) {
        case "error":
            return <h4>Please enter a valid, public username!</h4>
        case "none":
            return <button 
            type="get" 
            id="get-button" 
            onClick={() => this.getHaiku(this.state.tweets)}
            className="button">NEW HAIKU</button>
        default:
            return <div/>
        }
    }

    passRenderInstructions = (instructionNumber) => {
        this.setState({
            renderInstructions: instructionNumber
        })
    }

    render() {
        
        return (
        <section className="main">
            <section className="user-side" className="enter">
                <Instructions render={this.state.renderInstructions} />
                <div className="input">
                    <form ref={(input) => this.userForm = input} 
                    className="user-input" 
                    onSubmit={(event) => this.enterUser(event)} >
                        <input ref={(input) => this.user = input} 
                        type="text" htmlFor="username" 
                        name="username" id="username" />
                        <button 
                        type="submit" id="submit-button" className="enter">Start</button>
                    </form>
                    {this.errorHandle(this.state.error)}
                </div>
                    <Output 
                    passRenderInstructions={this.passRenderInstructions} 
                    haiku={this.state.haiku} 
                    visible={this.state.visibleHaiku} />
            </section>
        </section>
        )
    }
}

export default Input

