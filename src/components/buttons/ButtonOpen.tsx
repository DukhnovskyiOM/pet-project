import './buuttonOpen.css'
import { Context } from '../../context/context'
import { useContext } from 'react'

const ButtonOpen = () => {
  const {openList} = useContext(Context)
  return(
    <button className="button__open" onClick={() => openList()}>Open room</button>
  )
} 

export default ButtonOpen