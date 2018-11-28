import React from "react"
import ReactDOM from "react-dom"

import Api from "./api"
import Photo from "./Photo.js"
import Semaphore from "./Semaphore.js"
import style from './sass/style.scss'

class Site extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pictureUrls: [undefined, undefined, undefined]
    }

    this.render = this.render.bind(this)
  }

  componentDidMount() {
    Api.getPictures().then((response) => {
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
        #123e4567-e89b-12d3-a456-426655440000
      </div>
      <Semaphore />
      <div className="photos">
        <Photo pictureUrl={this.state.pictureUrls[0]} />
        <Photo pictureUrl={this.state.pictureUrls[1]} />
        <Photo pictureUrl={this.state.pictureUrls[2]} />
      </div>
    </div>
  }
}

ReactDOM.render(
  <Site/>,
  document.getElementById("root")
);
