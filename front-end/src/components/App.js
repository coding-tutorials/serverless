import React from 'react'
import { connect } from 'react-redux'
import { getToken  } from '../redux/actions'

import Photo from "./Photo.js"
import Semaphore from "./Semaphore.js"

import '../sass/style.scss'

class App extends React.Component {
  componentDidMount() {
    this.props.getToken()
  }

  render(){
    return (<div>
      <div className="logo">
        <img src={require('../assets/logo.png')} />
      </div>
      <div className="identifier">
        {this.props.tokenId ? this.props.tokenId : "Loading Token..."}
      </div>
      <div className="photos">
        <Photo pictureUrl={this.props.pictures[0]} />
        <Photo pictureUrl={this.props.pictures[1]} />
        <Photo pictureUrl={this.props.pictures[2]} />
      </div>
      <Semaphore status={this.props.status}/>
    </div>)
  }
}

const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = { getToken }

export default connect(mapStateToProps, mapDispatchToProps)(App)
