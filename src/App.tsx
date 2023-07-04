import React from 'react'
import RoomList from './pages/roomList/RoomList'
import CreateRoom from './pages/createRoom/CreateRoom'
import SettingRoom from './pages/settingRoom/SettingRoom'
import { Routes, Route } from 'react-router-dom'
//import { Navigation } from './components/navigation/Navigation'
import SettingRoomDesk from './pages/settingRoom/SettingRoomDesk'
import Room from './pages/room/Room'
import Home from './pages/home/Home'

function App() {
  return (
    <>
    {/* <Navigation /> */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/list' element={<RoomList />} />
        <Route path='/create' element={<CreateRoom />} />
        <Route path='/setting' element={<SettingRoom />} />
        <Route path='/setting/:id' element={<SettingRoomDesk />} />
        <Route path='/room/:id' element={<Room />} />
      </Routes>
    </>
  )
}

export default App
