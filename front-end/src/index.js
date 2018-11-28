import React from "react"
import ReactDOM from "react-dom"

import Api from "./api"
import Photo from "./Photo.js"
import Semaphore from "./Semaphore.js"
import Pusher from 'pusher-js';
import style from './sass/style.scss'

class Site extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pictureUrls: [undefined, undefined, undefined],
      tokenId: undefined,
      status: 0
    }

    this.render = this.render.bind(this)
    this.loadPictures = this.loadPictures.bind(this)
  }

  componentDidMount() {
    Api.getToken().then((response) => {
      this.setState({ tokenId: response.data.tokenId, status: 1  }, () => {
        var pusher = new Pusher('5b3f7f34937efe18bd63', {
          cluster: 'us2'
        });
        var channel = pusher.subscribe(`lambdaChannel-${this.state.tokenId}`);
        console.log('caminho do token', `lambdaChannel-${this.state.tokenId}`)
        channel.bind('photoStamperEvent', (data) => {
          this.setState({ status: 2 })
          console.log('An event was triggered with message: ' + data.message);
        });
        this.loadPictures(this.state.tokenId)
      })
    })
  }

  loadPictures(tokenId) {
    Api.getPictures(tokenId).then((response) => {
      console.log("response", response.data.pictures)
      this.setState( {
        pictureUrls: response.data.pictures
      })
    })
  }

  render() {
    return <div>
      <div className="logo">
        <img src={require('./assets/logo.png')} />
      </div>
      <div className="identifier">
        {this.state.tokenId ? this.state.tokenId : "Loading Token..."}
      </div>
      <div className="photos">
        <Photo pictureUrl={this.state.pictureUrls[0]} />
        <Photo pictureUrl={this.state.pictureUrls[1]} />
        <Photo pictureUrl={this.state.pictureUrls[2]} />
      </div>
      <Semaphore status={this.state.status}/>
    </div>
  }
}

ReactDOM.render(
  <Site/>,
  document.getElementById("root")
);
