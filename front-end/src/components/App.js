import React from 'react'
import { connect } from 'react-redux'
import actions from '../redux/actions'
import { getSession, getPictures, listenNotification } from '../redux/actions'

import Photo from "./Photo.js"
import Semaphore from "./Semaphore.js"

import '../sass/style.scss'

class App extends React.Component {
  componentDidMount() {
    this.props.getSession()
  }

  componentWillReceiveProps({ status, sessionId }) {
    if(status === actions.GET_SESSION){
      this.props.getPictures(sessionId)
      this.props.listenNotification(sessionId)
    }
  }

  render(){
    const picturesUrls = [undefined, undefined, undefined]
    const stampedPictures = [undefined, undefined, undefined]

    this.props.picturesUrls.forEach((p, i) => picturesUrls[i] = p)
    this.props.stampedPictures.forEach((p, i) => stampedPictures[i] = p)

    return (<div>
      <div className="logo">
        <img src={require('../assets/logo.png')} />
      </div>
      <div className="identifier">
        {this.props.tokenId ? this.props.tokenId : "Loading Token..."}
      </div>
      <div className="photos">
        <Photo pictureUrl={picturesUrls[0]} stampedPicture={stampedPictures[0]} />
        <Photo pictureUrl={picturesUrls[1]} stampedPicture={stampedPictures[1]} />
        <Photo pictureUrl={picturesUrls[2]} stampedPicture={stampedPictures[2]} />
      </div>
      <Semaphore status={this.props.status}/>
    </div>)
  }
}

const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = { getSession, getPictures, listenNotification }

export default connect(mapStateToProps, mapDispatchToProps)(App)
