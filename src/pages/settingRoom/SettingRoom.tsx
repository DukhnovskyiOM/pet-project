import React from "react";
import styles from "./settingRoom.module.scss";
import OneDesk from "../../components/formCountDesk/OneDesk";
import { useAppSelector } from "../../hooks/useAppSelection";
import { useDispatch } from "react-redux";
import { addNewDesk } from "../../redux/room/room.slice";
import { v4 as uuid } from "uuid";
import Plus from "../../img/plus.png";
import { Navigation } from "../../components/navigation/Navigation";
import Back from "../../img/back.png";
import { useNavigate } from "react-router-dom";

const SettingRoom: React.FC = () => {
  
  const navigate = useNavigate()
  const { rooms } = useAppSelector((state) => state.place);
  const dispatch = useDispatch();
  const addDesk = (roomName: string) => {
    const id = uuid();
    dispatch(addNewDesk({ roomName, id }));
  };

  console.log(rooms);
  return (
    <>
    <Navigation />
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <img className={styles.back} width={25} height={25} src={Back} alt="Back" onClick={() => navigate(-1)} />
        <span className={styles.title}>{`Room name: ${rooms[rooms.length - 1].name}`}</span>
        <div className={styles.desk__set}>
          {rooms[rooms.length - 1].desks.map((el, i) => (
            <OneDesk data={el} key={i} />
          ))}
        <img className={styles.plus} width={125} height={125} src={Plus} alt="Add new desk" onClick={() => addDesk(rooms[rooms.length - 1].name)} />
        </div>
      </div>
    </div>
    </>
  );
};

export default SettingRoom;
