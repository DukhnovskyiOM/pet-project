import './formCountDesk.css'
import './oneDesk.scss'
import IconWorkPlace from "../../img/Work-Icon.png"
import BtnDelete from "../../img/btn-delete.png"
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {actions} from '../../redux/room/room.slice'
import { useState } from 'react';

    const DeskSet = ({deskN}) => {
        const dispatch = useDispatch()
        const [arrDesk, setArrDesk] = useState('')
        const userInfo = useSelector(state => state.desk);
        const dataDesk =(e) => {
            e.preventDefault()
            const idDesk = deskN.name
            const nameDesk = e.target[0].value
            const numberSeats = e.target[1].value
            const startTime = e.target[2].value
            const endTime = e.target[3].value
            console.log(idDesk);
            
            //setArrDesk([...arrDesk, {nameDesk, numberSeats, startTime, endTime, idDesk}])
            //console.log(nameDesk, numberSeats, startTime, endTime, idDesk)
            dispatch(actions.deskAdd({nameDesk, numberSeats, startTime, endTime, idDesk}))
        }
console.log(userInfo);

        const delDesk = (e) => {
            console.log(e);
            const id = deskN.name
            dispatch(actions.deskDel(id))
        }


    return (

        <div className="wrapper__desk">
            <img className='btn_delete'src={BtnDelete} alt="DeleteDesk" onClick={delDesk}/>
            <div className='wrap__left'>
                <img width={100} height={100} src={IconWorkPlace} alt="Workplace"/>
            </div>
            <div className='wrap__right'>
                <form onSubmit={dataDesk}>
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
            </div>
        </div>
    )
 }


export default DeskSet