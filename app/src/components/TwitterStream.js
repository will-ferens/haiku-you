import React, { Component } from 'react'


class TwitterStream extends Component {
    componentDidMount() {

    }

    render () {
            return (
            <div className="twitter-stream">
                <a className="twitter-timeline"
                href="https://twitter.com/haiku_you19"
                data-chrome="nofooter noborders"
                data-height="400"
                border-color="#A8AAFF">
                </a>
            </div>
        )  
    } 
}

export default TwitterStream
