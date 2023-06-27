import React from "react";
import styles from "./roomList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelection";
import { delRoom } from "../../redux/room/room.slice";
import SettingOneRoom from "../settingRoom/SettingOneRoom";
import Room from "../room/Room";

const RoomList: React.FC = () => {
  const navigate = useNavigate();
  const [edit, setEdit] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [sendRoomName, setSendRoomName] = React.useState('')
  const dispatch = useDispatch();
  const { rooms } = useAppSelector((state) => state.place);
  // const roomInfo = useSelector(state => state.desk);
  // console.log(roomInfo)
  // let arr = []
  // roomInfo.forEach(e => {
  //   arr.push(e.nameRoom)
  // })
  // console.log(arr)
  // let uniqueNames = new Set(arr);
  // let r = Array.from(uniqueNames).sort((a,b) => a -b)
  // let res = r.map(e => <li>{e}</li>)
console.log(rooms);

  // const rooms = [
  //   {
  //     name: "First",
  //   },
  //   {
  //     name: "Second",
  //   },
  //   {
  //     name: "First",
  //   },
  // ];

  const deleteRoom = (roomName) => {
    //console.log(name);
    //console.log(rooms.filter(room => room.name !== '1'));
    dispatch(delRoom({ roomName }));
  }
  const editRoom = (roomName) => {
    setEdit(true)
    setSendRoomName(roomName)
    //console.log(name);
    //console.log(rooms.filter(room => room.name !== '1'));
    //dispatch(delRoom({ roomName }));
    
  }

  const openRoom = (roomName) => {
    setOpen(true)
    setSendRoomName(roomName)
  };

  return (
    // <div>
    //     <ul>{res}</ul>
    // </div>
    <>
        {!edit ?
       
        <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
        <span className={styles.title}>List room</span>
        {rooms.map((room, i) => (
          <div key={i} className={styles.list}>
            {room.name}
            <div>
              <button onClick={() => openRoom(room.name)}>Enter</button>
              <button onClick={() => deleteRoom(room.name)}>Delete</button>
              <button onClick={() => editRoom(room.name)}>Edit</button>
            </div>
          </div>
        ))}
        </div>
        </div>
        
        :
        <>
        {!open ?
          <>
          <button className={styles.btn_back} onClick={() => setEdit(false)}>-back-</button>
          <SettingOneRoom name={sendRoomName} />
          </>
        :
          <>
          <button className={styles.btn_back} onClick={() => setOpen(false)}>-back-</button>
          <Room name={sendRoomName}/>
          </>
        }
        </>
        

      }
      </>

  );
};

export default RoomList;
