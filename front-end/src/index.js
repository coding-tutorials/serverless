import React from "react"
import ReactDOM from "react-dom"

import Photo from "./Photo.js"
import Semaphore from "./Semaphore.js"
import style from './sass/style.scss'

const HelloWorld = () => {
  return <div>
    <div className="logo">
      <img src={require('./assets/logo.png')} />
    </div>
    <div className="identifier">
      #123e4567-e89b-12d3-a456-426655440000
    </div>
    <Semaphore />
    <div className="photos">
      <Photo />
      <Photo />
      <Photo />
    </div>
  </div>
}

ReactDOM.render(
  <HelloWorld/>,
  document.getElementById("root")
);
