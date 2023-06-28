import './App.css'
import RoomList from './pages/roomList/RoomList'
import CreateRoom from './pages/createRoom/CreateRoom'
import SettingRoom from './pages/settingRoom/SettingRoom'
import { Routes, Route } from 'react-router-dom'
import { Navigation } from './components/navigation/Navigation'

function App() {
  return (
    <>
    <Navigation />
      <Routes>
        <Route path='/' element={<RoomList />} />
        <Route path='/create' element={<CreateRoom />} />
        <Route path='/setting' element={<SettingRoom />} />
      </Routes>
    </>
  )
}

export default App
