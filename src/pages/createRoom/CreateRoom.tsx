import React from "react";
import styles from "./createRoom.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRoom } from "../../redux/room/room.slice";
import { v4 as uuid } from 'uuid';
import { useAppSelector } from "../../hooks/useAppSelection";
import { Navigation } from "../../components/navigation/Navigation";

const CreateRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rooms } = useAppSelector((state) => state.place);
  const desksNumber = 9;
  const [nameRoom, setNameRoom] = React.useState("");
  const [err, setErr] = React.useState(false);

  const onDesk = (num: number) => {
      dispatch(createRoom({ name: nameRoom, num, id: uuid() }));
      navigate("/setting");
      setErr(false)
  }

  const createRoomName = (e) => {
    const name = e.target.room.value
    e.preventDefault();
    if(rooms.some(el => el.name === name)){
      setErr(true)
    } else {
      setErr(false)
    }
    setNameRoom(name);
  };

  return (
    <>
      <Navigation />
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.title}>Create room</span>
        {err && <span className={styles.err}>change room name</span>}
         
        <form onSubmit={createRoomName}>
              <input name="room" type="text" placeholder="enter room name :: Room-1" onChange={() => setNameRoom('')} required />
              {!nameRoom && <button type="submit">Save</button>}
        </form>
        {nameRoom && !err &&
        (
          <>
            <div className={styles.list}>Choice number of tables</div>
            <div className={styles.desk}>
              {[...Array(desksNumber)].map((n, i) => (
                <div
                  key={i}
                  className={styles.desk__item}
                  onClick={() => onDesk(desksNumber - i)}
                >
                  🅞
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default CreateRoom;
