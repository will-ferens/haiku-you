import React, { Component } from 'react'
import './App.css'

class Output extends Component {
    render () {
        return (
            <div>
            <p>{this.props.userHaiku}</p>
            </div>
        )
    }
}

export default Output