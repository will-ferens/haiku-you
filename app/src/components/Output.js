import React, { Component } from 'react'
import '../App.css'

class Output extends Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            haiku: ''
        }
        this.toggleEdit = this.toggleEdit.bind(this)
        this.editHaiku = this.editHaiku.bind(this)
        this.handleTweet = this.handleTweet.bind(this)
    }
    toggleEdit(event){
        this.setState({visible: !this.state.visible})
    }
    editHaiku(event){
        event.preventDefault()
        this.setState({
            haiku: event.target.value
        })
    }
    deleteTweet(event){
        event.preventDefault()
        fetch('http://localhost:8080/haikus', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST'
        })
    }
    handleTweet(event){
        event.preventDefault()
        this.setState({haiku: this.props.haiku})
        fetch('http://localhost:8080/haikus', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                haiku: this.state.haiku,
                username: this.props.username
            })
        }).then((response, err) => {
            if(!err){
                return response.json()
            }
        })
    }

    render () {
            const { haiku } = this.props
            return (
            <li>
             {this.state.visible ? false : <p>{haiku.haiku}</p>}
             {this.state.visible && <textarea onInput={this.editHaiku} value={this.state.haiku} id="haiku-editor">{haiku.haiku}</textarea>}
             <h4>{haiku.username}</h4>
             <button onClick={this.toggleEdit}>Edit</button> 
             <button onClick={this.handleTweet}>Save/Tweet</button>
             <button onClick={this.deleteTweet}>Delete</button>
             </li>
        )  
    } 
}

export default Output

    