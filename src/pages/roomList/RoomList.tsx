import React from "react";
import styles from "./roomList.module.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelection";
import { delRoom } from "../../redux/room/room.slice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Navigation } from "../../components/navigation/Navigation";
import { useAuth } from "../../hooks/useAuth";

const RoomList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {isAuth} = useAuth()
  const { rooms } = useAppSelector((state) => state.place);

  const deleteRoom = (roomName: string) => {
    dispatch(delRoom({ roomName }));
  };

  return ( 
    <>
    <Navigation />
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.title}>List room</span>
        {rooms.length ?
          rooms.map((room, i) => (
            <div key={i} className={styles.list} >
              <div className={styles.open} onClick={() => navigate(`/room/${room.id}`)}>{`Room name: ${room.name}`}</div>
              {isAuth && 
              <div>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => navigate(`/setting/${room.id}`)} />
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteRoom(room.name)} />
              </div>
              }
            </div>
          ))
        :
        <span className={styles.empty}>Empty</span>
        }
      </div>
    </div>
    </>
   );
};

export default RoomList;
