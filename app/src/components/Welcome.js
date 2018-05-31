import React from 'react'
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group'

const Welcome = () => {
    return (
        <div className="instructions">
            <h3>Welcome!</h3>
            <p>Haiku You builds haikus using an assemblage of your own tweets!</p>
            <p>Get started by entering a public twitter username below.</p>
        </div>
    )
}

export default Welcome