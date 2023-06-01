import './buttonCreate.css'
import { Context } from '../../context/context'
import { useContext } from 'react'

const ButtonCreate = () => {
  const {createNewRoom} = useContext(Context)
  return(
    <button className="button__create" onClick={() => createNewRoom()}>Create room</button>
  )
}

export default ButtonCreate