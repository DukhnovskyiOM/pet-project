import React from "react";
import styles from './createRoom.module.scss'
import { useNavigate } from "react-router-dom";
// import FormCountDesk from "../../components/formCountDesk/FormCountDesk";

const CreateRoom: React.FC = () => {
  const navigate = useNavigate()
  const desksNumber = 9
  const [nameRoom, setNameRoom] = React.useState('')
  const [numberOfDesks, setNumberOfDesks] = React.useState(0)

  function onDesk (e: number){
    setNumberOfDesks(e)
    navigate("/setting")
  }

  const createRoomName = (e) => {
    e.preventDefault()
    setNameRoom(e.target[0].value)
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
      <span className={styles.title}>Create room</span>
            {!nameRoom ? 
            <>
            <div className={styles.list}>Create room name</div>
            <form onSubmit={createRoomName}>
                <input type='text' placeholder='Room-1' required />
                <button type="submit">Save</button>
            </form>
            </>
            : 
            <>
            <div className={styles.list}>Choice number of tables</div>
            <div className={styles.desk}>
                        {[...Array(desksNumber)].map((n,i) => <div key={i} className={styles.desk__item} onClick={() => onDesk(desksNumber - i)}>🅞</div>
                    )}
            </div>
            </>
            }
      </div>
    </div>
  )
}

export default CreateRoom