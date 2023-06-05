import { useState } from 'react'
import './App.css'
import ButtonCreate from './components/buttons/ButtonCreate'
import ButtonOpen from './components/buttons/ButtonOpen'
import RoomList from './components/roomList/RoomList'
import { Context } from './context/context'
import CreateRoom from './components/createRoom/CreateRoom'

function App() {

  const [listOpen, setListOpen] = useState(false)
  const [createRoom, setCreateRoom] = useState(false)

  const openList = () => {
    setListOpen(!listOpen)
    setCreateRoom(false)
  }
  const createNewRoom = () => {
    setCreateRoom(!createRoom)
    setListOpen(false)
  }

  return (
    <>
    <Context.Provider value={{openList, createNewRoom}}>
    <div>
      <ButtonOpen />
      <ButtonCreate />
    </div>
    <div className='wrapper'>
    {listOpen && <RoomList />}
    {createRoom && <CreateRoom />}
    </div>
    </Context.Provider>
    </>
  )
}

export default App
