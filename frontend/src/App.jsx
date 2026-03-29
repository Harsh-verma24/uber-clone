import React from 'react'
import {Routes, Route} from 'react-router-dom'
import StartPage from './pages/StartPage'
import UserLoginPage from './pages/UserLoginPage'
import UserRegisterPage from './pages/UserRegisterPage'
import DriverLoginPage from './pages/DriverLoginPage'
import DriverRegisterPage from './pages/DriverRegisterPage'
import Home from './pages/Home'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<StartPage/> } />
      <Route path='/user-login' element={<UserLoginPage/> } />
      <Route path='/user-signup' element={<UserRegisterPage/> } />
      <Route path='/driver-login' element={<DriverLoginPage/> } />
      <Route path='/driver-signup' element={<DriverRegisterPage/> } />
      <Route path='/home' element={<Home/> } />
    </Routes>
    </>
  )
}

export default App