import { useRoom } from '../../hooks/useRoom'
import { actions } from '../../redux/room/room.slice'
import './formCountDesk.css'
import {useSelector, useDispatch} from 'react-redux'

    const AddDesk = ({deskN}) => {
        // const {room} = useSelector(state => state)
        const {desk} = useRoom()
        const dispatch = useDispatch()
        console.log(desk)
    return (
        <div className="desk__set__item">
            <div className='button__change'>
            <button className='btn_set' onClick={() => dispatch(actions.deskAdd(deskN))}>+</button>
            </div>
        </div>
    )
 }


export default AddDesk