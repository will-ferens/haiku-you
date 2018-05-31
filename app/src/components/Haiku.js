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
        fetch('http://localhost:8089/haiku', {
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
                    <textarea defaultValue={this.props.haiku} 
                    onChange={(e) => {this.setHaiku(e)}} ref={(input) => {this.value = input}} ></textarea>) :
                <ul id="haiku-list">
                    <li className="haiku-list-item">{this.props.haiku[0]}</li>
                    <li className="haiku-list-item">{this.props.haiku[1]}</li>
                    <li className="haiku-list-item">{this.props.haiku[2]}</li>
                </ul>}

                {this.state.isEditVisible ?( 
                    <button 
                    onClick={() => 
                        {this.handleHaiku(this.state.userHaiku)
                        }}
                        className="button">TWEET</button>
                ) : 
                    this.props.visible && 
                    <button 
                    onClick={() => 
                        {this.handleHaiku(
                            `${this.props.haiku[0]}, 
                            ${this.props.haiku[1]}, 
                            ${this.props.haiku[2]}`)
                        }}
                    className="button">TWEET</button>}

                {this.props.visible && 
                    <button 
                    onClick={this.toggleEdit}
                    className="button">EDIT</button>}    
            </div>
        )  
    } 
}
//this.props.renderInstructions
export default Haiku
