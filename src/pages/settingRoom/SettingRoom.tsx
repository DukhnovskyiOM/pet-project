import React from "react";
import styles from './settingRoom.module.scss'
import OneDesk from "../../components/formCountDesk/OneDesk";

const SettingRoom: React.FC = () => {


  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
      <span className={styles.title}>Setting room -name room-</span>
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

export default SettingRoom