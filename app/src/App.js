
import React, { Component } from 'react'

import Input from './components/Input'
import Header from './components/Header'
import Footer from './components/Footer'
import TwitterStream from './components/TwitterStream'

class App extends Component {
  constructor() {
    super()
      this.state = {
      }
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <Input />
        <TwitterStream />
        <Footer />
      </div>
    )
  }
}

export default App