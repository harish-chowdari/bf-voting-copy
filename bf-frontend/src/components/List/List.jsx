import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "./List.css"
import ListPopup from "../../Popup/ListPopup/ListPopup"
import ImgPopup from '../../Popup/ImgPopup/ImgPopup'



const List = () => {
  const [listItems, setListItems] = useState([])
  const [voteBtn, setVoteBtn] = useState(false)
  const [enable, setEnable] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [showPopupImg, setShowPopupImg] = useState(false)

  const submitVote = async (itemName) => {
    const userId = localStorage.getItem("user-id")

    if(!userId) 
    {
      setPopupMessage("User Id not found in local storage")
      setShowPopup(true)
      return
    }

    try 
    {
      const voteData = 
      {
        userId: userId,
        itemName: itemName
      }

      const res = await axios.post(`http://localhost:2008/vote/${userId}`, voteData)

      if(res.data === "Already voted today") 
      {
        setPopupMessage("You have already voted today.")
        setShowPopup(true)
      } 
      
      else 
      {
        const votedItem = listItems.find(item => item.itemName === itemName)
        if (votedItem) {
          setPopupMessage(`Your vote has been added to ${votedItem.itemName}`)
          setShowPopup(true)
          setVoteBtn(true)
        }
      }
    } 
    
    catch(error) 
    {
      console.log("Error submitting vote:", error)
      setPopupMessage("error")
      setShowPopup(true)
    }
  }

  const fetchData = async () => {
    const res = await axios.get("http://localhost:2008/getbreakfastbytimestamp")
    setListItems(res.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date()
      const currentHour = currentTime.getHours()
      const currentMinutes = currentTime.getMinutes()

      if (currentHour === 14 && currentMinutes <= 59) 
      {
        setEnable(true)
      } 
      
      else 
      {
        setEnable(false)
      }
    }, 1)

    return () => clearInterval(interval)
  }, [])


  useEffect(() => {
    if (showPopup) {
      const timeout = setTimeout(() => {
        setShowPopup(false);
      }, 7000);

      return () => clearTimeout(timeout);
    }
  }, [showPopup]);


  const closePopup = () => {
    setShowPopup(false)
    setSelectedImage(null)
    setShowPopupImg(false)
  }

  const handleImageClick = (imageURL) => {
    setSelectedImage(imageURL)
    setShowPopupImg(true)
  }

  const handleDownloadImage = async () => {
    try 
    {
      const response = await axios.get(selectedImage, {
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url

      const filename = selectedImage.substring(selectedImage.lastIndexOf('/') + 1)
      link.setAttribute('download', filename)
      document.body.appendChild(link)

      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } 
    
    catch(error) 
    {
      console.error('Error downloading image:', error)
    }
  }

  return (
    <div className='container'>
      <div className='vote-title'>
        {enable ? <p className='vote-bf'>Vote for your favorite Breakfast</p> :
          <p className='timup-title'>Time for voting is 8-9 am</p>}
      </div>
      {listItems.length <= 0 ? "Items List is empty" :
        <div className='list-items'>
          <ol className='list-items-list'>
            {listItems.map((item, index) => (
              <div key={index} className='item-in-list'>
                <img
                  className='list-img'
                  onClick={() => handleImageClick(item.image)}
                  src={item.image}
                  alt={item.itemName}
                />
                <button disabled={!enable || voteBtn} onClick={() => submitVote(item.itemName)} className='vote-button'>Vote</button>
                <p className='list-itemName'>{item.itemName}</p>
              </div>
            ))}
          </ol>
        </div>
      }

      {showPopup && <ListPopup message={popupMessage} handleClose={closePopup} />}

      <ImgPopup showPopupImg={showPopupImg} selectedImage={selectedImage} 
          closePopup={closePopup} handleDownloadImage={handleDownloadImage}
           />
    </div>
  )
}

export default List
