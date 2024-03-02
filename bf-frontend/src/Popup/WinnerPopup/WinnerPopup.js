import React from 'react'
import "./WinnerPopup.css"


const WinnerPopup = ({ popUpMsg, handleClick }) => {
    return (
      <div className='popup-container'>
        <div className='pop-content'>
          <p>{popUpMsg}</p>
          <button onClick={handleClick}>Close</button>
        </div>
      </div>
    );
  };

  

export default WinnerPopup