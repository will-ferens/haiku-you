import React from 'react'
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group'

const Welcome = () => {
    return (
        <div className="instructions">
            <h3>Happy Haiku!</h3>
            <p>Refresh the page to see your tweet live on the stream at @haiku_you19</p>
            <p>Follow and share your beautiful work!</p>
        </div>
        )
}

export default Welcome