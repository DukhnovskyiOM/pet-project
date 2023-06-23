import React from "react";
import styles from './roomList.module.scss'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const RoomList: React.FC = () => {

  const navigate = useNavigate()
  const roomInfo = useSelector(state => state.desk);
  console.log(roomInfo)
  let arr = []
  roomInfo.forEach(e => {
    arr.push(e.nameRoom)
  })
  console.log(arr)
  let uniqueNames = new Set(arr);
  let r = Array.from(uniqueNames).sort((a,b) => a -b)
  let res = r.map(e => <li>{e}</li>)

  const rooms = [
    {
      name: 'First',
    },
    {
      name: 'Second',
    },
    {
      name: 'First',
    },
  ]
  
  const openRoom = () => {
    navigate("/room")
  }

  return (
    // <div>
    //     <ul>{res}</ul>
    // </div>
    <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
            <span className={styles.title}>List room</span>
                {rooms.map((room) => (
                  <div className={styles.list}>
                    {room.name}
                    <div>
                    <button onClick={openRoom}>Enter</button>
                    <button>Delete</button>
                    <button>Edit</button>
                    </div>
                  </div>
                ))}
            </div>
        </div>
  )
}

export default RoomList