import React from "react";
import styles from "./settingRoom.module.scss";
import OneDesk from "../../components/formCountDesk/OneDesk";
import { useAppSelector } from "../../hooks/useAppSelection";
import { useDispatch } from "react-redux";
import { addNewDesk } from "../../redux/room/room.slice";
import { v4 as uuid } from "uuid";

const SettingRoom: React.FC = () => {
  const { rooms } = useAppSelector((state) => state.place);
  const dispatch = useDispatch();
  const addDesk = (roomName: string) => {
    const id = uuid();
    dispatch(addNewDesk({ roomName, id }));
  };

  console.log(rooms);
  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.title}>{rooms[rooms.length - 1].name}</span>
        <button onClick={() => addDesk(rooms[rooms.length - 1].name)}>
          Add new desk
        </button>
        <div className={styles.desk__set}>
          {rooms[rooms.length - 1].desks.map((el, i) => (
            <OneDesk data={el} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingRoom;
