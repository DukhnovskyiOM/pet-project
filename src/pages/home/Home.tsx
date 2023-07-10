import React from "react";
import styles from "./home.module.scss";
import IconWorkPlace from "../../img/Work-Icon.png";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";

const Home = () => {
    const navigate = useNavigate()
    const [modalActive, setModalActive] = React.useState(false)
    const [value, setValue] = React.useState('')
    
    const handleSubmit = (e) => {
      e.preventDefault()
      setValue(e.target.key.value)
      navigate('/create')
    }
console.log(value);

    
  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <img width={100} height={100} src={IconWorkPlace} alt="Workplace" />
        <button className={styles.btnOpen} onClick={() => navigate('/list')}>GUEST</button>
        <button className={styles.btnOpen} onClick={() => setModalActive(true)}>ADMIN</button>
        <Modal active={modalActive} setActive={setModalActive}>
        <form onSubmit={handleSubmit}>
          <input type="text" maxLength={8} placeholder="UNIQUE KEY" defaultValue={value} name="key" required/>
          <button className={styles.button} type="submit">{'>'}</button>
        </form>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
