import React, { useEffect } from "react";
import styles from "./settingRoom.module.scss";
import OneDesk from "../../components/formCountDesk/OneDesk";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelection";
import { addNewDesk } from "../../redux/room/room.slice";
import { v4 as uuid } from "uuid";
import Plus from "../../img/plus.png";
import { Navigation } from "../../components/navigation/Navigation";
import Back from "../../img/back.png";
import { useLocation, useNavigate } from "react-router-dom";

const SettingRoom: React.FC = () => {
  
  const navigate = useNavigate()

  const { rooms, loading, error } = useAppSelector((state) => state.place);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const idRoom = rooms?.findIndex(e => e.name === location?.state?.name)

 

  const addDesk = (roomName: string) => {
    const id = uuid();
    dispatch(addNewDesk({ roomName, id }));
  };

  return (
    <>
    <Navigation />
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <img className={styles.back} width={25} height={25} src={Back} alt="Back" onClick={() => navigate(-1)} />
        <span className={styles.title}>Room name: <br/>{rooms[idRoom]?.name}</span>
        <div className={styles.desk__set}>
          {rooms[idRoom]?.desks.map((el, i) => (
            <OneDesk data={el} key={i} />
          ))}
        <img className={styles.plus} width={125} height={125} src={Plus} alt="Add new desk" onClick={() => addDesk(rooms[idRoom]?.name)} />
        </div>
        {loading && <h2>Loading...</h2>} 
        {error && <h2>An error: {error}</h2>}
      </div>
    </div>
    </>
  );
};

export default SettingRoom;
