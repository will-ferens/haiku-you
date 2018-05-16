
import React, { Component } from 'react'
import './App.css'
import Input from './components/Input'
import Header from './components/Header'

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
      </div>
    )
  }
}

export default App