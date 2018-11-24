import React from 'react'
import PropTypes from 'prop-types'

class Photo extends React.Component {

  render() {
    return <div className="photo">
      <img className="photo__picture" src="https://www.photovideoedu.com/Portals/0/Lighting/Amherst_Off-Camera_Flash_van_Niekerk_image_03-4.jpg" />
      <div className="photo__status"></div>
    </div>
  }
}

export default Photo
