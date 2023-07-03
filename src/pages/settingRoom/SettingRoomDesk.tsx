import React from "react";
import styles from "./settingRoom.module.scss";
import OneDesk from "../../components/formCountDesk/OneDesk";
import { useAppSelector } from "../../hooks/useAppSelection";
import { v4 as uuid } from "uuid";
import { addNewDesk } from "../../redux/room/room.slice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const SettingRoomDesk = () => {
  const dispatch = useDispatch();
  const { rooms } = useAppSelector((state) => state.place);
  const {id} = useParams()
  const [idRoom, setIdRoom] = React.useState(NaN)
  const [roomName, setRoomName] = React.useState('')
  

  React.useEffect(() => {
    const roomId = rooms?.findIndex((e) => String(e.id) === String(id)) 
    const name = rooms[roomId].name
    setIdRoom(roomId);
    setRoomName(name)
  }, [id, rooms])

  const addDesk = () => {
    const id = uuid();
    dispatch(addNewDesk({ id, roomName }));
  };


  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.title}>{roomName}</span>
        <button onClick={() => addDesk()}>Add new desk</button>
        <div className={styles.desk__set}>
          {rooms[idRoom]?.desks.map((el, i) => (
            <OneDesk data={el} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingRoomDesk;
