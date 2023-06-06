import { useState } from 'react'
import './App.css'
import ButtonCreate from './components/buttons/ButtonCreate'
import ButtonOpen from './components/buttons/ButtonOpen'
import RoomList from './pages/roomList/RoomList'
import { Context } from './context/context'
import CreateRoom from './pages/createRoom/CreateRoom'
import { Routes, Route } from 'react-router-dom'
import { Navigation } from './components/navigation/Navigation'

function App() {

  // const [listOpen, setListOpen] = useState(false)
  // const [createRoom, setCreateRoom] = useState(false)

  // const openList = () => {
  //   setListOpen(!listOpen)
  //   setCreateRoom(false)
  // }
  // const createNewRoom = () => {
  //   setCreateRoom(!createRoom)
  //   setListOpen(false)
  // }
  // const {amt} = useAppSelector(store => store.deskReducer)
  // const {increment} = deskSlice.actions
  // const dispatch = useAppDispatch()

  return (
    <>
    <Navigation />
    <Routes>
      <Route path='/' element={<RoomList />} />
      <Route path='/create' element={<CreateRoom />} />
    </Routes>
    {/* <Context.Provider value={{openList, createNewRoom}}>
    <div>
      <ButtonOpen />
      <ButtonCreate />
    </div>
    <div className='wrapper'>
    {listOpen && <RoomList />}
    {createRoom && <CreateRoom />}
    </div>
    </Context.Provider> */}
    </>
  )
}

export default App
