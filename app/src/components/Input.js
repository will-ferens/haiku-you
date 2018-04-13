import React, { Component } from 'react'
import Output from './Output'
import '../App.css'


class Input extends Component {
    constructor(props){
        super()
        this.state = {
            haiku: null,
            
        }
    }
    enterUser(event) {
        event.preventDefault()
        const user = {
            username: this.user.value
        }
        this.setState({user: this.user.value})
        fetch('https://haiku-you.herokuapp.com/user', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(user)
        }).then(response => {
            console.log(response)
                fetch('https://haiku-you.herokuapp.com/haiku', {
                  method: 'GET'
                }).then( (response, err) => {
                  if(!err){
                    return response.json()
                  } else {
                    console.log(err)
                  }
                })
                .then(response => {
                  this.setState({haiku: response})
                }) 
        })  
    }
    deleteHaikus(event){
        event.preventDefault()
        fetch('https://haiku-you.herokuapp.com/haiku', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'DELETE'
        }).then(response => {
            return response.json()
        })
    }
    render() {
        return (
        <section>
            <div className="input">
                <form ref={(input) => this.userForm = input} className="userName" onSubmit={(event) => this.enterUser(event)}>
                    <input ref={(input) => this.user = input} type="text" htmlFor="username" name="username" />
                    <input type="submit" id="submit-button" />
                </form>
                <button type="delete" id="delete-button" onClick={(event) => this.deleteHaikus(event)}>Delete Haikus</button>
            </div>
            <div className="output">
                <Output userHaiku={this.state.haiku} />
            </div>
        </section>
        )
  }
}

export default Input

