import React from "react";
import styles from "./roomList.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelection";
import { deleteRoomApi } from "../../redux/room/room.slice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Navigation } from "../../components/navigation/Navigation";
import { useAuth } from "../../hooks/useAuth";


const RoomList = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const {email} = useAuth()
  const [userRoom, setUserRoom] = React.useState(false);
  const { rooms, loading, error } = useAppSelector((state) => state.place);


  return ( 
    <>
    <Navigation />
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.title}>List room</span>
        {rooms.length ?

        <>
        {email && 
        <div className={styles.checkbox}>
          <label><input type="checkbox" defaultChecked={userRoom} onClick={() => setUserRoom(!userRoom)} /> Only my room ({email})</label>
        </div>
        }<div className={styles.list_wrapp}>
        {userRoom ? 
        rooms.filter(e => e.email === email).map((room, i) => (
          <div key={i} className={styles.list} >
            <div className={styles.open} onClick={() => navigate(`/room/${room.id}`)}>{`Room name: ${room.name}`}</div>
            <div>
              <FontAwesomeIcon icon={faPenToSquare} onClick={() => navigate(`/setting/${room.id}`)} />
              <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(deleteRoomApi(room.id))} />
            </div>
          </div>
        ))
        :
        rooms.map((room, i) => (
          <div key={i} className={styles.list} >
            <div className={styles.open} onClick={() => navigate(`/room/${room?.id}`)}>{`Room name: ${room?.name}`}</div>
          </div>
        ))
        }
        </div>
        </>
        :
        <span className={styles.empty}>Empty</span>
        }
        {loading && <h2>Loading...</h2>} 
        {error && <h2>An error: {error}</h2>}
      </div>
    </div>
    </>
   );
};

export default RoomList;
