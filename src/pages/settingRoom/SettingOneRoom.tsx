import React from "react";
import styles from "./settingRoom.module.scss";
import OneDesk from "../../components/formCountDesk/OneDesk";
import { useAppSelector } from "../../hooks/useAppSelection";

import { v4 as uuid } from 'uuid';
import { addNewDesk } from "../../redux/room/room.slice";
import { useDispatch } from "react-redux";

const SettingRoom: React.FC = ({name}) => {
    console.log(name);
    const dispatch = useDispatch();
    
  const { rooms } = useAppSelector((state) => state.place);
  const indexRoom = rooms?.findIndex(e=> e.name === name)
console.log(indexRoom);

const addDesk = (roomName) => {
  const id = uuid()
  dispatch(addNewDesk({roomName, id}))
}
  return (
    <div className={styles.formContainer}>
    <div className={styles.formWrapper}>
        <span className={styles.title}>{name}</span>
        <button onClick={() => addDesk(name)}>Add new desk</button>
        <div className={styles.desk__set}>
          {rooms[indexRoom]?.desks.filter(e=> e.name !== '').map((el, i) => (
            <OneDesk data={el} key={i} />
          ))}
        </div>
        </div>
    </div>
  );
};

export default SettingRoom;
