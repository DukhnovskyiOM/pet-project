import React from "react";
import styles from "./settingRoom.module.scss";
import OneDesk from "../../components/formCountDesk/OneDesk";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelection";
import { v4 as uuid } from "uuid";
import { addNewDesk } from "../../redux/room/room.slice";
import { useParams, useNavigate } from "react-router-dom";
import Plus from "../../img/plus.png";
import { Navigation } from "../../components/navigation/Navigation";
import Back from "../../img/back.png";

const SettingRoomDesk = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { rooms, loading, error } = useAppSelector((state) => state.place);
  const {id} = useParams()
  const [idRoom, setIdRoom] = React.useState(NaN)
  const [roomName, setRoomName] = React.useState('')

  

  React.useEffect(() => {
    const roomId = rooms?.findIndex((e) => String(e.id) === String(id)) 
    const name = rooms[roomId]?.name
    setIdRoom(roomId);
    setRoomName(name)
  }, [id, rooms, navigate])

  const addDesk = () => {
    const id = uuid();
    dispatch(addNewDesk({ id, roomName }));
  };



  return (
    <>
    <Navigation />
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <img className={styles.back} width={25} height={25} src={Back} alt="Back" onClick={() => navigate(-1)} />
        <span className={styles.title}>Room name: <br/>{roomName}</span>
        <div className={styles.desk__set}>
          {rooms[idRoom]?.desks.map((el, i) => (
            <OneDesk data={el} key={i} />
          ))}
          <img className={styles.plus} width={125} height={125} src={Plus} alt="Add new desk" onClick={() => addDesk()} />
        </div>
        {loading && <h2>Loading...</h2>} 
        {error && <h2>An error: {error}</h2>}
      </div>
    </div>
    </>
  );
};

export default SettingRoomDesk;
