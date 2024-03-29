import React, { useEffect } from "react";
import styles from "./oneDesk.module.scss";
import IconWorkPlace from "../../img/Work-Icon.png";
import AddDesk from "../../img/add-desk.png";
import { IDesk } from "../../models/model";
import { deleteDesk, editDesk, editRoomApi } from "../../redux/room/room.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from "../../hooks/useAppSelection";

interface props {
  data: IDesk;
}

const OneDesk = ({ data }: props) => {
  const dispatch = useAppDispatch();
  const [save, setSave] = React.useState(false);

  const addDesk = (e) => {
    e.preventDefault();

    const nameDesk = e.target[0].value;
    const numberSeats = e.target[1].value;
    const startTime = e.target[2].value;
    const endTime = e.target[3].value;

    const arrTime: number[] = new Array(
      ((endTime.slice(0, 2) - startTime.slice(0, 2)) * 60) / 15
    ).fill(Number(numberSeats));

    if (startTime.slice(0, 2) > endTime.slice(0, 2)) {
      alert("start time mast be earle then end time");
      return;
    }

    dispatch(
      editDesk({
        id: data.id,
        name: nameDesk,
        roomName: data.roomName,
        seats: numberSeats,
        start: startTime,
        end: endTime,
        arrTime,
      })
    );
    setSave(true);
    
    dispatch(editRoomApi(data.roomName))
  };

  const delDesk = () => {
    const idDesk = data.id;
    const roomName = data.roomName;
    dispatch(deleteDesk({ roomName, idDesk }));
    setSave(false);
    dispatch(editRoomApi(roomName))
  };

  useEffect(() => {
    if(data?.name){
      setSave(true);
    }
  }, [data?.name])

  return (
    <div className={styles.wrapperDesk}>
      <div className={styles.wrap__left}>
        {!data?.name ? 
        <img width={70} height={70} src={IconWorkPlace} alt="Workplace" /> 
        : 
        <>
        <img width={70} height={70} src={AddDesk} alt="Workplace" />
        <FontAwesomeIcon className={styles.edit} icon={faPenToSquare} onClick={() => setSave(false)} />
        </>
        }
        <FontAwesomeIcon className={styles.del} icon={faTrash} onClick={delDesk} />
      </div>
      <div className={styles.wrap__right}>
          <form onSubmit={addDesk}>
          <span>
              Name:
            <input
              defaultValue={data?.name}
              disabled={save && true}
              type="text"
              placeholder=":: new-desk"
              required
            />
            </span>
            <span>
              Seats:
            <input
              defaultValue={data?.seats ? data?.seats : ''}
              disabled={save && true}
              type="number"
              placeholder=":: 4"
              step="1"
              min="0"
              max="100"
              required
            />
            </span>
            <span>
              Start:
              <input
               disabled={save && true}
                defaultValue={data?.start}
                type="time"
                step="3600"
                min="06:00"
                max="22:00"
              />
              </span>
              <span>
              End:
              <input
                disabled={save && true}
                defaultValue={data?.end}
                type="time"
                step="3600"
                min="07:00"
                max="23:00"
              />
            </span>
            <button type="submit" disabled={save && true} className={save ? styles.save : ''}>{!save ? "Save" : "added"}</button>
          </form>

      </div>
    </div>
  );
};

export default OneDesk;
