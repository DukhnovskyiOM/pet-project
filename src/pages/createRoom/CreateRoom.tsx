import React from "react";
import styles from "./createRoom.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRoom } from "../../redux/room/room.slice";
// import FormCountDesk from "../../components/formCountDesk/FormCountDesk";

const CreateRoom: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const desksNumber = 9;
  const [nameRoom, setNameRoom] = React.useState("");

  function onDesk(num: number) {
    console.log(num, "num");
    dispatch(createRoom({ name: nameRoom, num }));
    navigate("/setting");
  }

  const createRoomName = (e: any) => {
    e.preventDefault();
    setNameRoom(e.target.room.value);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.title}>Create room</span>
        {!nameRoom ? (
          <>
            <div className={styles.list}>Create room name</div>
            <form onSubmit={createRoomName}>
              <input name="room" type="text" placeholder="Room-1" required />
              <button type="submit">Save</button>
            </form>
          </>
        ) : (
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
