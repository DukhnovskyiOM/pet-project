import React from "react";
import styles from "./settingRoom.module.scss";
import OneDesk from "../../components/formCountDesk/OneDesk";
import { useAppSelector } from "../../hooks/useAppSelection";

const SettingRoom: React.FC = () => {
  const { rooms } = useAppSelector((state) => state.place);
console.log(rooms);
  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.title}>{rooms.at(-1)?.name}</span>
        <div className={styles.desk__set}>
          {rooms.at(-1)?.desks.map((el, i) => (
            <OneDesk data={el} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingRoom;
