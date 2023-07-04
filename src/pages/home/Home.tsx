import React from "react";
import styles from "./home.module.scss";
import IconWorkPlace from "../../img/Work-Icon.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <img width={100} height={100} src={IconWorkPlace} alt="Workplace" />
        <button className={styles.btnOpen} onClick={() => navigate('/list')}>GUEST</button>
        <button className={styles.btnOpen}>ADMIN</button>
        
      </div>
    </div>
  );
};

export default Home;
