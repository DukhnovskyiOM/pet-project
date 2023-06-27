import React from "react";
import styles from "./settingRoom.module.scss";
import OneDesk from "../../components/formCountDesk/OneDesk";
import { useAppSelector } from "../../hooks/useAppSelection";

const SettingRoom: React.FC = ({name}) => {
    console.log(name);
    
  const { rooms } = useAppSelector((state) => state.place);
  const indexRoom = rooms?.findIndex(e=> e.name === name)
console.log(indexRoom);
  return (
    <div className={styles.formContainer}>
    <div className={styles.formWrapper}>
        <span className={styles.title}>{name}</span>
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
