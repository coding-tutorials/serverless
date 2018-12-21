import React from 'react'
import PropTypes from 'prop-types'

class Photo extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        hasToAnimate: false
      }
  }

  componentDidUpdate(prevProps) {
    const hasChangedPicture = this.props.pictureUrl !== prevProps.pictureUrl
    const hasStamped = this.props.stampedPicture !== prevProps.stampedPicture
    if (hasChangedPicture || hasStamped) {
      this.setState({ hasToAnimate: true }, () => {
        setTimeout(() => this.setState({ hasToAnimate: false }), 500)
      })
    }
  }

  render() {
    return <div className="photo">
      <img className={`photo__picture ${this.state.hasToAnimate ? 'photo__picture--animate' : ""}`} src={this.props.stampedPicture || this.props.pictureUrl} />
      <div className="photo__status"></div>
    </div>
  }
}

Photo.defaultProps = {
  pictureUrl: 'https://conteudo.imguol.com.br/c/entretenimento/c4/2018/05/15/super-mario-odyssey-1526426783086_v2_1170x540.jpgx'
};

Photo.propTypes = {
  pictureUrl: PropTypes.string,
  stampedPicture: PropTypes.string
};

export default Photo
