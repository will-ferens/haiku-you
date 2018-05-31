import React from 'react'

import Welcome from './Welcome'
import Perfect from './Perfect'
import Happy from './Happy'

const Instructions = ({render}) => {

        switch(render) {
            case 1:
                return <Welcome />
            case 2:
                return <Perfect />
            case 3:
                return <Happy />
            default:
                return <div/>
        }

        return (
            <div>
                {this.renderInstructions(this.props.render)}
            </div>
        )
}

export default Instructions