import React, { Component } from 'react'


class Instructions extends Component {
    


    render () {
        switch(this.props.render) {
            case 1:
                return this.renderInit()
            case 2:
                return this.renderSecond()
            case 3:
                return this.renderThird()
        }
    } 

    renderInit() {
        return (
            <div className="instructions">
                <div className="welcome">
                    <h3>Welcome!</h3>
                    <p>Haiku You builds haikus using an assemblage of your own tweets!</p>
                    <p>Get started by entering a public twitter username below.</p>
                </div>
            </div>
        )
    }
    renderSecond(){
        return (
        <div className="not-perfect">
            <h3>I'm not perfect!</h3>
            <p>Sometimes I'll grab a tweet without enough syllables, and other times I miscount.</p>
            <p>Help out by editing your poem! Or is it already perfect? Hit tweet!</p>
        </div>
        )
    }
    renderThird(){
        return (
        <div className="enjoy">
            <h3>Happy Haiku!</h3>
            <p>Refresh the page to see your tweet live on the stream at @haiku_you19</p>
            <p>Follow and share your beautiful work!</p>
        </div>
        )
    }
}

export default Instructions