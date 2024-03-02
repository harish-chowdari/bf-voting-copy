import React from 'react'
import "./ImgPopup.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'


const ImgPopup = ({showPopupImg, showPopup, selectedImage, closePopup, handleDownloadImage }) => {
  return (
    <div>
    {showPopupImg ?
        <div className="list-popup-overlay">
          <div className="list-popup">
            <img src={selectedImage} alt="Popup" className='list-popup-img' />

            <div className='list-btns'>
              <button className='list-close' onClick={closePopup}>Close</button>
              <button className='list-download' onClick={handleDownloadImage}>
                <FontAwesomeIcon icon={faDownload} />
              </button>
            </div>
            
          </div>
        </div> 
        :

        showPopup &&
        <div className="item-popup-overlay" >
          <div className="item-popup">
            <img src={selectedImage} alt="Popup" className='item-popup-img' />
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      

      }

      
      </div>
  )
}

export default ImgPopup