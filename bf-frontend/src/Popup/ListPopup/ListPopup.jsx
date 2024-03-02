import React from 'react'
import "./ListPopup.css"



const ListPopup = ({ message, handleClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={handleClose}>X</button>
      </div>
    </div>
  )
}

export default ListPopup