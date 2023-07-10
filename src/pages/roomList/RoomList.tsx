import React from "react";
import styles from "./roomList.module.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelection";
import { delRoom } from "../../redux/room/room.slice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const RoomList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { rooms } = useAppSelector((state) => state.place);

  console.log(rooms);

  const deleteRoom = (roomName: string) => {
    dispatch(delRoom({ roomName }));
  };

  return ( 
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.title}>List room</span>
        {rooms &&
          rooms.map((room, i) => (
            <div key={i} className={styles.list} >
              <div className={styles.open} onClick={() => navigate(`/room/${room.id}`)}>{`Room name: ${room.name}`}</div>
              <div>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => navigate(`/setting/${room.id}`)} />
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteRoom(room.name)} />
              </div>
            </div>
          ))}
      </div>
    </div>
   );
};

export default RoomList;
