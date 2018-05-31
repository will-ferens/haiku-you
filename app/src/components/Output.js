import React, { Component } from 'react'
import Haiku from './Haiku'

class Output extends Component {
    render () {
            return (
            <div className="haiku-card">
                <Haiku 
                passRenderInstructions={this.props.passRenderInstructions} 
                haiku={this.props.haiku} 
                visible={this.props.visible} />
            </div>
        )  
    } 
}

export default Output

    