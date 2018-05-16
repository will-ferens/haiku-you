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
    componentDidMount(){
        this.setState({
            userHaiku: `${this.props.haiku[0]}, ${this.props.haiku[1]}, ${this.props.haiku[2]},`
        })
    }
    toggleEdit(event){
        this.setState({isEditVisible: !this.state.isEditVisible})
    }
    setHaiku(event){
        this.setState({
            userHaiku: this.value.value
        })
    }
    handleHaiku(evet){

    }
    render () {
        return (
            <ul id="haiku-list">
                <li className="haiku-list-item">{this.props.haiku[0]}</li>
                <li className="haiku-list-item">{this.props.haiku[1]}</li>
                <li className="haiku-list-item">{this.props.haiku[2]}</li>
                {this.state.isEditVisible && <textarea defaultValue={this.props.haiku} onChange={(e) => {this.setHaiku(e)}} ref={(input) => {this.value = input}} ></textarea>}
                {this.props.visible && <button onClick={this.toggleEdit}>Edit</button>}
                {this.props.visible && <button onClick={this.handleHaiku}>Save</button>}
            </ul>
        )  
    } 
}

export default Haiku
