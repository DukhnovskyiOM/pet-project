import React from "react";
import './formCountDesk.css'
import './oneDesk.scss'
import IconWorkPlace from "../../img/Work-Icon.png"
import BtnDelete from "../../img/btn-delete.png"
import AddDesk from "../../img/add-desk.png"
//import { v4 as uuid } from 'uuid';
// import { useDispatch, useSelector } from 'react-redux';
// import {actions} from '../../redux/room/room.slice'

    const OneDesk = () => {
        const [dataDesk, setDataDesk] = React.useState('')
        // const dispatch = useDispatch()
       
        // const userInfo = useSelector(state => state.desk);
         const addDesk = (e) => {
             e.preventDefault()
             //     const idDesk = deskN.id
             const nameDesk = e.target[0].value
             const numberSeats = e.target[1].value
             const startTime = e.target[2].value
             const endTime = e.target[3].value
             setDataDesk([...dataDesk, {nameDesk, numberSeats, startTime, endTime }])
             //     console.log(idDesk);
        //     const nameRoom =deskN.nameRoom
            
        //     dispatch(actions.deskAdd({nameDesk, numberSeats, startTime, endTime, idDesk, nameRoom}))
         }
         console.log(dataDesk);

         const delDesk = (e) => {
            setDataDesk('')
        //     console.log(e);
        //     const id = deskN.id
        //     const nameRoom =deskN.nameRoom
        //     dispatch(actions.deskDel({nameRoom, id}))
         }


    return (

        <div className="wrapper__desk">
            {dataDesk && <img className='btn_delete'src={BtnDelete} alt="DeleteDesk" onClick={delDesk}/>}
            <div className='wrap__left'>
                <img width={100} height={100} src={IconWorkPlace} alt="Workplace"/>
            </div>
            <div className='wrap__right'>
                {!dataDesk ?  
                <form onSubmit={addDesk}>
                    <input className='input' type='text' placeholder='Name example: Desk-1' required />
                    <input className='input' type='number' placeholder='Number of seats example: 4' step="1" min="0" max="100" required/>
                    <span>
                        Start:
                        <input type='time'/>
                        End:
                        <input type='time'/>
                    </span>
                    <button type="submit">Save</button>
                </form>
                :
                <div className="add__desk">
                    <img width={80} height={80} src={AddDesk} alt="Workplace"/>
                    <span>Desk add</span>
                </div>
                
                }
            </div>
        </div>
    )
 }


export default OneDesk