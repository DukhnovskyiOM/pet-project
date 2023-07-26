import React from "react";
import styles from "./createRoom.module.scss";
import { useNavigate } from "react-router-dom";
import { addRoomApi } from "../../redux/room/room.slice";
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelection";
import { Navigation } from "../../components/navigation/Navigation";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

const CreateRoom = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {email} = useAuth()
  const { rooms } = useAppSelector((state) => state.place);
  const desksNumber = 9;
  const [nameRoom, setNameRoom] = React.useState("");
  const [err, setErr] = React.useState(false);

  const onDesk = (num: number) => {
    const room = {
      name: nameRoom,
      email: email,
      desks: Array(num)
        .fill({
          name: "",
          roomName: nameRoom,
          seats: "",
          start: "00:00",
          end: "00:00",
        })
        .map((el) => ({ ...el, id: uuid() })),
    };

      dispatch(addRoomApi(room));
      navigate("/setting",{state:{name: nameRoom}});
      setErr(false)
  }

  const checkName = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.get('https://64a7df50dca581464b84ecc6.mockapi.io/rooms');

      if(data.some(el => el.name === e.target.room.value) && rooms.some(el => el.name === e.target.room.value)){
        setErr(true)
      } else {
        setErr(false)
        setNameRoom(e.target.room.value);
      }  

    } catch (error) {
      alert('Server Error!');
    }
  }
  

  return (
    <>
      <Navigation />
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.title}>Create room</span>
        {err && <span className={styles.err}>change room name</span>}
         
        <form onSubmit={checkName}>
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
