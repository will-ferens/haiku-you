import React, { Component } from 'react'
import Welcome from './Welcome'
import Perfect from './Perfect'
import Happy from './Happy'
class Instructions extends Component {

    renderInstructions(instructionNumber) {
        switch(instructionNumber) {
            case 1:
                return <Welcome />
            case 2:
                return <Perfect />
            case 3:
                return <Happy />
            default:
                return <div/>
        }
    }
    render () {
        return (
            <div>
            {this.renderInstructions(this.props.render)}
            </div>
        )
        
    } 

    // renderInit() {
    //     return (
            
    //     )
    // }
    // renderSecond(){
    //     return (
    //     <div className="instructions">
    //         <h3>I'm not perfect!</h3>
    //         <p>Sometimes I'll grab a tweet without enough syllables, and other times I miscount.</p>
    //         <p>Help out by editing your poem! Or is it already perfect? Hit tweet!</p>
    //     </div>
    //     )
    // }
    // renderThird(){
    //     return (
    //     <div className="instructions">
    //         <h3>Happy Haiku!</h3>
    //         <p>Refresh the page to see your tweet live on the stream at @haiku_you19</p>
    //         <p>Follow and share your beautiful work!</p>
    //     </div>
    //     )
    // }
}

export default Instructions