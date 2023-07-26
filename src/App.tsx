import React, { useEffect } from 'react'
import RoomList from './pages/roomList/RoomList'
import CreateRoom from './pages/createRoom/CreateRoom'
import SettingRoom from './pages/settingRoom/SettingRoom'
import { Routes, Route } from 'react-router-dom'
import SettingRoomDesk from './pages/settingRoom/SettingRoomDesk'
import Room from './pages/room/Room'
import Home from './pages/home/Home'
import { useAppDispatch } from './hooks/useAppSelection'
import { axiosRoomsApi } from './redux/room/room.slice'
import { RequireAuth } from './components/hoc/RequireAuth'

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(axiosRoomsApi())
  }, [dispatch])
  return (
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/list' element={<RoomList />} />
        <Route path='/create' element={
        <RequireAuth>
          <CreateRoom />
        </RequireAuth>
        } />
        <Route path='/setting' element={
        <RequireAuth>
          <SettingRoom />
        </RequireAuth>
        } />
        <Route path='/setting/:id' element={
        <RequireAuth>
          <SettingRoomDesk />
        </RequireAuth>
        } />
        <Route path='/room/:id' element={<Room />} />
      </Routes>
  )
}

export default App
