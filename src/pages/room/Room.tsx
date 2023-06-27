import React from "react";
import styles from './room.module.scss'
//import OneDesk from "../../components/formCountDesk/OneDesk";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelection";

const Room: React.FC = ({name}) => {
  //const dispatch = useDispatch();
  const { rooms } = useAppSelector((state) => state.place);
  const indexRoom = rooms?.findIndex(e=> e.name === name)

  return (
    <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
        <span className={styles.title}>{name}</span>
        {rooms[indexRoom].desks.filter(e=> e.name !== '').map((desk, i) => (
          <div key={i} className={styles.list}>
            {desk.name}
            <div>
            {desk.seats}
            </div>
          </div>
        ))}
        </div>
        </div>
  )
}

export default Room