import React from "react";
import styles from './room.module.scss'
import OneDesk from "../../components/formCountDesk/OneDesk";

const Room: React.FC = () => {


  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
      <span className={styles.title}>-name room-</span>
            <div className={styles.desk__set}>   
                <OneDesk />
                <OneDesk />
                <OneDesk />
                <OneDesk />
            </div>
      </div>
    </div>
  )
}

export default Room