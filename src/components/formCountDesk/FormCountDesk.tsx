import { memo, useState } from 'react';
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
    const [nameRoom, setNameRoom] = useState('')

    function onDesk (e: number){
        setNVDesk(e)
        setNDesk(e)
        setCheck(true)
    }
    function offDesk (){
        setNDesk(numDesk)
        setCheck(false)
    }


    const createRoomName = (e) => {
        e.preventDefault()
        const nameRoom = e.target[0].value
        setNameRoom(nameRoom)
    }

    // const sendD = (e) => {
    //     console.log(e)
    // }

    // const Greeting = memo(function Greeting() {

    //     return (
    //         <div className="desk__set">
    //                     {[...Array(nVDesk)].map((n, i) =>
    //                 <DeskSet
    //                 key={uuid()}
    //                 deskN={{
    //                     nameRoom,
    //                     id: i + 1,
    //                 }}
    //                  />
    //                 )}
    //             </div>
    //     );
    // });

    return (
        <div>
            <form onSubmit={createRoomName}>
                <input type='text' placeholder='Room name' required />
                <button type="submit">Save</button>
            </form>
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
                    key={uuid()}
                    deskN={{
                        nameRoom,
                        id: i + 1,
                    }}
                     />
                    )}
                </div> */}
                {/* <Greeting /> */}
                    <div className="desk__set">   
                    <DeskSet
                    deskN={{
                        nameRoom,
                        id: 1,
                        name: 1,
                    }}
                     />
                     <DeskSet
                    deskN={{
                        nameRoom,
                        id: 2,
                        name: 2,
                    }}
                     />
                     <DeskSet
                    deskN={{
                        nameRoom,
                        id: 3,
                        name: 3,
                    }}
                     />
                     <DeskSet
                    deskN={{
                        nameRoom,
                        id: 4,
                        name: 4,
                    }}
                     /></div>
          </>
          }
          
      </div>
    )
}
export default FormCountDesk;