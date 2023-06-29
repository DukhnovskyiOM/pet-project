import React from "react";
import styles from './room.module.scss'
import { useAppSelector } from "../../hooks/useAppSelection";
import { useDispatch } from "react-redux";
import { reserveDeskToRoom } from "../../redux/room/room.slice";

const Room: React.FC = ({name}) => {
  const { rooms } = useAppSelector((state) => state.place);
  const indexRoom = rooms?.findIndex(e=> e.name === name)
  const [reserve, setReserve] = React.useState(false)
  const [errReserve, setErrReserve] = React.useState(false)
  const [dataDesk, setDataDesk] = React.useState({})

  
  const dispatch = useDispatch();

  const reserveDesk = (desk) => {
    //console.log(desk);
    setDataDesk(desk)
    setReserve(true)
  }
//console.log(dataDesk);

  const reserveOneDesk = (e) => {
    e.preventDefault();
    
    const seats = e.target[0].value;
    const startTime = e.target[1].value;
    const endTime = e.target[2].value;
    //const data = {seats, startTime, endTime}

    
    //const num1 = (startTime.slice(0, 2) - dataDesk.start.slice(0, 2)) * 60 / 15
    //const num2 = (startTime.slice(3) - dataDesk.start.slice(3)) / 15
    const startIdTime = ((startTime.slice(0, 2) - dataDesk.start.slice(0, 2)) * 60 / 15) + ((startTime.slice(3) - dataDesk.start.slice(3)) / 15)
    //const num4 = (endTime.slice(0, 2) - startTime.slice(0, 2)) * 60 / 15
    //const num5 = (endTime.slice(3) - startTime.slice(3)) / 15
    const timeArrLength = ((endTime.slice(0, 2) - startTime.slice(0, 2)) * 60 / 15) + ((endTime.slice(3) - startTime.slice(3)) / 15)
    const endIdTime = startIdTime + timeArrLength
    //const dataCutArr = {startIdTime, endIdTime}
    console.log(timeArrLength);
    
    const indexRoom = rooms.findIndex(e => e.name === dataDesk.roomName)
    //console.log(indexRoom);
    const indexDesk = rooms[indexRoom]?.desks.findIndex(e => e.id === dataDesk.id)
    //console.log(indexDesk);
    const newTimeArr = rooms[indexRoom].desks[indexDesk].arrTime
    //console.log(fer);
    const reserveArr = [...newTimeArr.slice(startIdTime, endIdTime)]
    //console.log(reserveArr);
    let newReserveArr
    if(reserveArr.some(e => e < seats)){
      //alert("1need new time or seats")
      setErrReserve(true)
    } else if(timeArrLength <= 0){
      setErrReserve(true)
    } else {
      newReserveArr = reserveArr.map(e => e - seats)
    }
    if(newReserveArr){
        if(newReserveArr?.some(e => e <= -1)){
          //alert("3need new time or seats")
          setErrReserve(true)
        } else {
          dispatch(reserveDeskToRoom({newReserveArr, startIdTime, endIdTime, indexRoom, indexDesk}))
          setErrReserve(false)
        }
      }
    
    console.log(newReserveArr);
  }

const idDesk = rooms[indexRoom]?.desks.findIndex(e => e.id === dataDesk.id)
// console.log(rooms[indexRoom]?.desks[idDesk].arrTime);
// console.log(idDesk);


  return (
    <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
        <span className={styles.title}>{name}</span>
        {reserve &&
        <>
          <form onSubmit={reserveOneDesk}>
            <input type="number" defaultValue={1} min={1} max={dataDesk?.seats} required/>
            <input defaultValue={dataDesk?.start} type="time" step="900" min={dataDesk?.start} max={dataDesk?.start.slice(0, 3)} required/>
            <input defaultValue={dataDesk?.start.slice(0, 3) + "15"} type="time" step="900" min={dataDesk?.start.slice(0, 3) + "15"} max={dataDesk?.end} required/>
            <button type="submit">Save</button>
            <span>{errReserve && "change time or seats"}</span>
          </form>
            <div className={styles.icon__time}>
              <span>{dataDesk?.start}</span>
              {rooms[indexRoom]?.desks[idDesk].arrTime.map((n, i) => (
                <div key={i} className={(n <= dataDesk.seats / 2) ? styles.desk__item_red : styles.desk__item} title={'free seats: ' + n}>🅞</div>
              ))}
              <span>{dataDesk?.end}</span>
            </div>
                
            </>
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