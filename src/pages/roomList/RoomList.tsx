import React from "react";
import styles from "./roomList.module.scss";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelection";
import { delRoom } from "../../redux/room/room.slice";
import { Link } from "react-router-dom";

const RoomList: React.FC = () => {
  const dispatch = useDispatch();
  const { rooms } = useAppSelector((state) => state.place);

  console.log(rooms);

  const deleteRoom = (roomName: string) => {
    dispatch(delRoom({ roomName }));
  };



  const List = () => (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.title}>List room</span>
        {rooms &&
          rooms.map((room, i) => (
            <div key={i} className={styles.list}>
              {room.name}
              <div>
                <Link key={room.id} to={`/room/${room.id}`}>Enter</Link>
                <button onClick={() => deleteRoom(room.name)}>Delete</button>
                <Link key={room.id} to={`/setting/${room.id}`}>Edit</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  return ( <List /> );
};

export default RoomList;
