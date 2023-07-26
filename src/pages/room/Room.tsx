import React from "react";
import styles from "./room.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelection";
import { editRoomApi, reserveDeskToRoom } from "../../redux/room/room.slice";
import { IDesk } from "../../models/model";
import Reserve from "../../components/reserve";
import { useNavigate, useParams } from "react-router-dom";
import Back from "../../img/back.png";
import { Navigation } from "../../components/navigation/Navigation";


const Room = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const { rooms } = useAppSelector((state) => state.place);
  const indexRoom = rooms?.findIndex((e) => String(e.id) === String(id));
  const name = rooms[indexRoom].name
  const [errReserve, setErrReserve] = React.useState(false);
  const [sendReserve, setSendReserve] = React.useState(false);
  const [dataDesk, setDataDesk] = React.useState<IDesk | null>(null);

  const dispatch = useAppDispatch();
  

  const reserveOneDesk = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const seats = e.target[0].value;
    const startTime = e.target[1].value;
    const endTime = e.target[2].value;

    const startIdTime =
      ((startTime.slice(0, 2) - Number(dataDesk?.start.slice(0, 2))) * 60) /
        15 +
      (startTime.slice(3) - Number(dataDesk?.start.slice(3))) / 15;
    const timeArrLength =
      ((endTime.slice(0, 2) - startTime.slice(0, 2)) * 60) / 15 +
      (endTime.slice(3) - startTime.slice(3)) / 15;
    const endIdTime = startIdTime + timeArrLength;

    const indexRoom = rooms.findIndex((e) => e.name === dataDesk?.roomName);

    const indexDesk = rooms[indexRoom]?.desks.findIndex(
      (e) => e.id === dataDesk?.id
    );

    const newTimeArr = rooms[indexRoom].desks[indexDesk].arrTime;

    const reserveArr = [...newTimeArr.slice(startIdTime, endIdTime)];

    let newReserveArr;
    if (reserveArr.some((e) => e < seats)) {
      setErrReserve(true);
      setSendReserve(false);
    } else if (timeArrLength <= 0) {
      setErrReserve(true);
      setSendReserve(false);
    } else {
      newReserveArr = reserveArr.map((e) => e - seats);
    }
    if (newReserveArr) {
      if (newReserveArr?.some((e) => e <= -1)) {
        setErrReserve(true);
        setSendReserve(false);
      } else {
        dispatch(
          reserveDeskToRoom({
            newReserveArr,
            startIdTime,
            endIdTime,
            indexRoom,
            indexDesk,
          })
        );
        setErrReserve(false);
        setSendReserve(true);
        dispatch(editRoomApi(dataDesk?.roomName))
      }
    }

  };


  return (
    <>
    <Navigation />
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
      <img className={styles.back} width={25} height={25} src={Back} alt="Back" onClick={() => navigate(-1)} />
        <span className={styles.title}>Room name: <br/>{name}</span>
        <div className={styles.box}>
          {rooms[indexRoom].desks
            .filter((e) => e.name !== "")
            .map((desk, i) => (
              <Reserve
                key={i}
                setErrReserve={setErrReserve}
                setSendReserve={setSendReserve}
                errReserve={errReserve}
                sendReserve={sendReserve}
                desk={desk}
                dataDesk={dataDesk}
                setDataDesk={setDataDesk}
                reserveOneDesk={reserveOneDesk}
                rooms={rooms}
                indexRoom={indexRoom}
              />
            ))}
        </div>
        {!rooms[indexRoom].desks.length && <span className={styles.empty}>Empty</span>}
      </div>
    </div>
    </>
  );
};

export default Room;
