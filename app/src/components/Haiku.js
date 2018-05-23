import React, { Component } from 'react'

class Haiku extends Component {
    constructor() {
        super()
        this.state = {
            isEditVisible: false,
            userHaiku: ''
        }
        this.toggleEdit = this.toggleEdit.bind(this)
    }
    
    toggleEdit(event){
        this.setState({isEditVisible: !this.state.isEditVisible})
    }
    setHaiku(event){
        this.setState({
            userHaiku: this.value.value
        })
    }
    handleHaiku(haiku){
        fetch('http://localhost:8089/inputs', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({input: haiku})
        })
        .then(response => {
            return response.json()
        })
        .then((res, err) => {
            
        })
    }
    render () {
        return (
            <ul id="haiku-list">
                <li className="haiku-list-item">{this.props.haiku[0]}</li>
                <li className="haiku-list-item">{this.props.haiku[1]}</li>
                <li className="haiku-list-item">{this.props.haiku[2]}</li>
                {this.state.isEditVisible && <textarea defaultValue={this.props.haiku} onChange={(e) => {this.setHaiku(e)}} ref={(input) => {this.value = input}} ></textarea>}
                {this.state.isEditVisible && <button onClick={() => {this.handleHaiku(this.state.userHaiku)}}>Tweet</button>}
                {this.props.visible && <button onClick={this.toggleEdit}>Edit</button>}
            </ul>
        )  
    } 
}

export default Haiku
