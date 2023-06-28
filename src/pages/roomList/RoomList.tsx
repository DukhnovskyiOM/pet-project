import React from "react";
import styles from "./roomList.module.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelection";
import { delRoom } from "../../redux/room/room.slice";
import SettingOneRoom from "../settingRoom/SettingOneRoom";
import Room from "../room/Room";

const RoomList: React.FC = () => {
  const [edit, setEdit] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [sendRoomName, setSendRoomName] = React.useState('')
  const dispatch = useDispatch();
  const { rooms } = useAppSelector((state) => state.place);
  
  console.log(rooms);

  const deleteRoom = (roomName) => {
    dispatch(delRoom({ roomName }));
  }

  const editRoom = (roomName) => {
    setEdit(true)
    setSendRoomName(roomName)
  }

  const openRoom = (roomName) => {
    setOpen(true)
    setSendRoomName(roomName)
  }

  const List = () => (
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
  )

  return (
      <>
      {!open ? 
      <>
      {!edit ? <List /> :
        <>
        <button className={styles.btn_back} onClick={() => setEdit(false)}>-back-</button>
        <SettingOneRoom name={sendRoomName} />
        </>
      }
      </>
      :
        <>
        <button className={styles.btn_back} onClick={() => setOpen(false)}>-back-</button>
        <Room name={sendRoomName}/>
        </> 
      }
      </>
  );
};

export default RoomList;
