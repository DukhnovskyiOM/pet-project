import React from "react";
import styles from "./createRoom.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRoom } from "../../redux/room/room.slice";
// import FormCountDesk from "../../components/formCountDesk/FormCountDesk";
import { v4 as uuid } from 'uuid';

const CreateRoom: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const desksNumber = 9;
  const [nameRoom, setNameRoom] = React.useState("");

  function onDesk(num: number) {
    console.log(num, "num");
    dispatch(createRoom({ name: nameRoom, num, id: uuid() }));
    navigate("/setting");
  }

  const createRoomName = (e) => {
    e.preventDefault();
    setNameRoom(e.target.room.value);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.title}>Create room</span>
        {!nameRoom ? 
            <form onSubmit={createRoomName}>
              <input name="room" type="text" placeholder="enter room name :: Room-1" required />
              <button type="submit">Save</button>
            </form>
          
         : (
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
  );
};

export default CreateRoom;
