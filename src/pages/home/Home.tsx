import React, { useEffect } from "react";
import styles from "./home.module.scss";
import IconWorkPlace from "../../img/Work-Icon.png";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { setUser } from "../../redux/user/user.slice";
import { useAppDispatch } from "../../hooks/useAppSelection";
import emailjs from '@emailjs/browser';

const Home = () => {
  
    const dispatch = useAppDispatch()
    const form = React.useRef();
    const navigate = useNavigate()
    const [modalActive, setModalActive] = React.useState(false)
    const [regActive, setRegActive] = React.useState(false)
    const [err, setErr] = React.useState(false)
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')
    const auth = getAuth(app);
  
    const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        dispatch(setUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        }));
        navigate('/create')
      })
      .catch((error) => {
        setErr(true);
        console.warn(error);
      });
    }
    

    const handleRegister = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
          dispatch(setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          }));
          navigate('/create')
        })
        .catch((error) => {
          setErr(true);
          console.warn(error);
        });
    }

    useEffect(() => {
      setErr(false)
    }, [regActive, modalActive])

    const sendEmail = (e) => {
      e.preventDefault();
      if(regActive){
        emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, import.meta.env.VITE_PUBLIC_KEY)
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
        e.target.reset()
        setModalActive(false)
      }
    };


  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <img width={100} height={100} src={IconWorkPlace} alt="Workplace" />
        <button className={styles.btnOpen} onClick={() => navigate('/list')}>GUEST</button>
        <button className={styles.btnOpen} onClick={() => setModalActive(true)}>ADMIN</button>
        <Modal active={modalActive} setActive={setModalActive}>

        <div className={styles.form_sing}>
          <form className={styles.formOne} ref={form} onSubmit={sendEmail}>
          <input type="email" placeholder="EMAIL" defaultValue={email} name="email" onChange={(e) => setEmail(e.target.value)} required/>
          <input type="text" placeholder="PASSWORD" defaultValue={password} name="password" onChange={(e) => setPassword(e.target.value)} required/>
          {err && <span className={styles.err}>incorrect data</span>}
          <button type="submit" className={styles.reg_button} onClick={!regActive ? handleLogin : handleRegister}>{!regActive ? `SING IN` : `SING UP`}</button>
          </form>
        </div>
        <span className={styles.sing} onClick={() => setRegActive(!regActive)}>{!regActive ? `I don't have an account` : `I have an account`}</span>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
