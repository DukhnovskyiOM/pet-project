import { useState } from 'react'
import './formCountDesk.css'

    const DeskSet = ({createRoom, idx}) => {
    const [count, setCount] = useState(4)

    const changeSetInc = () => {
        if(count === 0) {
            setCount(0)
        } else {
            setCount(count - 1)
            createRoom(count - 1, idx)
        }
        
      }
    const changeSetDec = () => {
        if(count === 9) {
            setCount(9)
        } else {
           setCount(count + 1) 
           createRoom(count + 1, idx)
        }
        
      }


    return (
        <div className="desk__set__item">
            <div className='button__change'>
            <button onClick={changeSetDec} className='btn_set'>+</button>
            <h1>{count}</h1>
            <button onClick={changeSetInc} className='btn_set'>-</button>
            </div>
        </div>
    )
 }


export default DeskSet