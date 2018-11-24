import React from 'react'
import PropTypes from 'prop-types'

class Semaphore extends React.Component {

  render() {
    return <div className="semaphore">
      <div className="semaphore__light semaphore__light__red"></div>
      <div className="semaphore__light semaphore__light__yellow"></div>
      <div className="semaphore__light semaphore__light__green"></div>
      <div className="semaphore__status">Getting stamps...</div>
    </div>
  }
}

export default Semaphore
