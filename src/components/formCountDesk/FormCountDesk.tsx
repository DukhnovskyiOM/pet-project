import { useState } from 'react';
import './formCountDesk.css'
import Desk from './Desk';
import DeskSet from './OneDesk';
import { useRoom } from '../../hooks/useRoom';
import { v4 as uuid } from 'uuid';




const FormCountDesk = () => {
    const {room} = useRoom()
    const numDesk = 9
    const [nDesk, setNDesk] = useState(numDesk)
    const [nVDesk, setNVDesk] = useState(0)
    const [check, setCheck] = useState(false)
    // const [arrDesk, setArrDesk] = useState([])

    function onDesk (e: number){
        setNVDesk(e)
        setNDesk(e)
        setCheck(true)
    }
    function offDesk (){
        setNDesk(numDesk)
        setCheck(false)
    }


//     function createRoom(e, i){

//         // let i = i:{e}
//         // let re = i
//         //console.log(e)
//         //console.log(i)
//         if(arrDesk.includes(i)){
//             setArrDesk(arrDesk)
//         } else {
//             setArrDesk([...arrDesk, i])
//         }
        
//     }
// console.log(arrDesk)
    return (
        <div>
            <h1>Step 1: Choice number of tables</h1>
            {check ? 
                <div>Your choice of {nVDesk} {room} desk <button onClick={() => offDesk()}>Reset</button></div>
                 : 
                <div className="desk">
                        {[...Array(nDesk)].map((n, i) =>
                    <Desk 
                    key={i}
                    onClick={() => onDesk(numDesk - i)}
                    />
                    )}
                </div>
          }
          
          

          {check && <>
          <h1>Step 2: Individual setting (number of seats)</h1>
          {/* <button onClick={() => createRoom()}>Confirm</button> */}
          {/* <div className="desk__set">
                        {[...Array(nVDesk)].map((n, i) =>
                    <DeskSet
                    key={i}
                    desk={{
                        id: 1,
                        name: 1,
                    }}
                    // idx={i+1}
                    // createRoom={createRoom}
                     />
                    )} */}<div className="desk__set">   
                    <DeskSet
                    deskN={{
                        id: uuid(),
                        name: 1,
                    }}
                     />
                     <DeskSet
                    deskN={{
                        id: uuid(),
                        name: 2,
                    }}
                     />
                     <DeskSet
                    deskN={{
                        id: uuid(),
                        name: 3,
                    }}
                     />
                     <DeskSet
                    deskN={{
                        id: uuid(),
                        name: 4,
                    }}
                     /></div>
                {/* </div> */}
          </>
          }
          
      </div>
    )
}
export default FormCountDesk;