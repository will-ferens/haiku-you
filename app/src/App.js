
import React, { Component } from 'react'
import './App.css'
import Input from './Input'


class App extends Component {
  constructor() {
    super()
      this.state = {
      }
  }
  
  render() {
    return (
      <div className="App">
       <h1>Haiku You</h1>
       <Input />
      </div>
    )
  }
}

export default App