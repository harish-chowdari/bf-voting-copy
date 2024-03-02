import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Chef from './components/Chef/Chef.jsx';
import ChefList from './components/ChefList/ChefList.jsx';
import Items from './components/Items/Items.jsx';
import Signup from './components/Signup/Signup.jsx';
import Winner from './components/Winner/Winner.jsx';
import Welcome from './components/Welcome/Welcome.jsx';
import List from "./components/List/List.jsx"
import Login from "./components/Login/Login.jsx"



const App = () => {
  const authToken = localStorage.getItem('auth-token');

  return (
    <div >
      <BrowserRouter>
        <Navbar />

        <Routes>
        {localStorage.getItem("user-email") === "chef@gmail.com" ? 
          
          (
          <>
          <Route path='/chef' element={<Chef/>} />
          <Route path='/cheflist' element={<ChefList/>}  />
          </>
          )
          
          : 
          
          (
            
             authToken &&
             <>
            
            <Route path="/items" element={<Items />} />
            <Route path="/list" element={<List />} />
            </> 
            
          )}          

          <Route path="/login" element={<Login />} />

          <Route path='/signup' element={<Signup/>} />

          <Route path='/winner' element={<Winner/>} />
          <Route path="/" element={<Welcome/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
