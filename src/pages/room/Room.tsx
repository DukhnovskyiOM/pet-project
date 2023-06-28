import React from "react";
import styles from './room.module.scss'
import { useAppSelector } from "../../hooks/useAppSelection";
import { useDispatch } from "react-redux";
import { reserveDeskToRoom } from "../../redux/room/room.slice";

const Room: React.FC = ({name}) => {
  const { rooms } = useAppSelector((state) => state.place);
  const indexRoom = rooms?.findIndex(e=> e.name === name)
  const [reserve, setReserve] = React.useState(false)
  const [dataDesk, setDataDesk] = React.useState({})
  
  const dispatch = useDispatch();

  const reserveDesk = (desk) => {
    //console.log(desk);
    setDataDesk(desk)
    setReserve(true)
  }
console.log(dataDesk);

  const reserveOneDesk = (e) => {
    e.preventDefault();
    
    const seats = e.target[0].value;
    const startTime = e.target[1].value;
    const endTime = e.target[2].value;
    const data = {seats, startTime, endTime}

    
    const num1 = (startTime.slice(0, 2) - dataDesk.start.slice(0, 2)) * 60 / 15
    const num2 = (startTime.slice(3) - dataDesk.start.slice(3)) / 15
    const num3 = num1 + num2
    const num4 = (endTime.slice(0, 2) - startTime.slice(0, 2)) * 60 / 15
    const num5 = (endTime.slice(3) - startTime.slice(3)) / 15
    const num6 = num5 + num4
    const num7 = num3 + num6
    const dataCutArr = {num3, num6, num7}
    console.log(num3, num6, num7);
    
    const indexRoom = rooms.findIndex(e => e.name === dataDesk.roomName)
    console.log(indexRoom);
    const indexDesk = rooms[indexRoom]?.desks.findIndex(e => e.id === dataDesk.id)
    console.log(indexDesk);
    const fer = rooms[indexRoom].desks[indexDesk].arrTime
    console.log(fer);
    if(fer[num3] < seats){
      alert("need new time or seats")
      return
    } else {
      dispatch(reserveDeskToRoom({dataDesk, data, dataCutArr}))
    }


    
  }

 


  return (
    <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
        <span className={styles.title}>{name}</span>
        {reserve &&
          <form onSubmit={reserveOneDesk}>
            <input type="number" defaultValue={1} min={1} max={dataDesk?.seats} required/>
            <input defaultValue={dataDesk?.start} type="time" step="900" min="06:00" max="22:00" required/>
            <input defaultValue={dataDesk?.start.slice(0, 3) + "15"} type="time" step="900" min="06:15" max="23:00" required/>
            <button type="submit">Save</button>
          </form>
          }
        {rooms[indexRoom].desks.filter(e=> e.name !== '').map((desk, i) => (
          <div key={i} className={styles.list}>
            {desk.name}
            <button onClick={() => reserveDesk(desk)}>reserve a table</button>
            <div>{desk.seats}</div>
          </div>
        ))}
        </div>
        </div>
  )
}

export default Room