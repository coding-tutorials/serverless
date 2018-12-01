import React from 'react'
import PropTypes from 'prop-types'

class Semaphore extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      message: "Getting Authetication Token..."
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      if (this.props.status === 1) {
        this.setState({ message: 'Getting Stamps...' })
      }
      if (this.props.status === 2) {
        this.setState({ message: 'Done!' })
      }
    }
  }

  render() {
    return <div className="semaphore">
      {this.props.status === 0 && <div className="semaphore__light semaphore__light__red"></div>}
      {this.props.status === 1 && <div className="semaphore__light semaphore__light__yellow"></div>}
      {this.props.status === 2 && <div className="semaphore__light semaphore__light__green"></div>}
      <div className="semaphore__status">{this.state.message}</div>
    </div>
  }
}

export default Semaphore
