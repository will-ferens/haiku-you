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
        fetch('https://haiku-you-server.herokuapp.com/haiku', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({input: haiku})
        })
        .then((res, err) => {
            console.log(res)
            return res
        })
        this.props.passRenderInstructions(3)
    }

    render () {
        return (
            <div>
                {this.props.visible && <h4>Your Haiku:</h4>}
                
                {this.state.isEditVisible ?( 
                    <textarea 
                    className="user-haiku"
                    defaultValue={this.props.haiku} 
                    onChange={(e) => {this.setHaiku(e)}} ref={(input) => {this.value = input}} ></textarea>) :
                <ul id="haiku-list" className="enter">
                    <li className="haiku-list-item">{this.props.haiku[0]}</li>
                    <li className="haiku-list-item">{this.props.haiku[1]}</li>
                    <li className="haiku-list-item">{this.props.haiku[2]}</li>
                </ul>}

                {this.state.isEditVisible ?( 
                    <button 
                    onClick={() => 
                        {this.handleHaiku(this.state.userHaiku)
                        }}
                        className="button" 
                        id="tweet-button">Tweet</button>
                ) : 
                    this.props.visible && 
                    <button 
                    onClick={() => 
                        {this.handleHaiku(
                            `${this.props.haiku[0]}, 
                            ${this.props.haiku[1]}, 
                            ${this.props.haiku[2]}`)
                        }}
                    className="button">Tweet</button>}

                {this.props.visible && 
                    <button 
                    onClick={this.toggleEdit}
                    className="button" id="edit-button">Edit</button>}    
            </div>
        )  
    } 
}
//this.props.renderInstructions
export default Haiku
