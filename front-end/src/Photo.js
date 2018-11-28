import React from 'react'
import PropTypes from 'prop-types'

class Photo extends React.Component {

  render() {
    return <div className="photo">
      <img className="photo__picture" src={this.props.pictureUrl} />
      <div className="photo__status"></div>
    </div>
  }
}

Photo.defaultProps = {
  pictureUrl: 'https://conteudo.imguol.com.br/c/entretenimento/c4/2018/05/15/super-mario-odyssey-1526426783086_v2_1170x540.jpgx'
};

Photo.propTypes = {
  pictureUrl: PropTypes.string.isRequired
};

export default Photo
