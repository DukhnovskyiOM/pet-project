import React from "react";
import styles from "./room.module.scss";
import { useAppSelector } from "../../hooks/useAppSelection";
import { useDispatch } from "react-redux";
import { reserveDeskToRoom } from "../../redux/room/room.slice";
import { IDesk } from "../../models/model";
import Reserve from "../../components/reserve";

const Room = ({ name }: { name: string }) => {
  const { rooms } = useAppSelector((state) => state.place);
  const indexRoom = rooms?.findIndex((e) => e.name === name);
  const [errReserve, setErrReserve] = React.useState(false);
  const [dataDesk, setDataDesk] = React.useState<IDesk | null>(null);

  const dispatch = useDispatch();

  //console.log(dataDesk);

  const reserveOneDesk = (e: any) => {
    e.preventDefault();

    const seats = e.target[0].value;
    const startTime = e.target[1].value;
    const endTime = e.target[2].value;
    //const data = {seats, startTime, endTime}

    //const num1 = (startTime.slice(0, 2) - dataDesk.start.slice(0, 2)) * 60 / 15
    //const num2 = (startTime.slice(3) - dataDesk.start.slice(3)) / 15

    const startIdTime =
      ((startTime.slice(0, 2) - Number(dataDesk?.start.slice(0, 2))) * 60) /
        15 +
      (startTime.slice(3) - Number(dataDesk?.start.slice(3))) / 15;

    //const num4 = (endTime.slice(0, 2) - startTime.slice(0, 2)) * 60 / 15
    //const num5 = (endTime.slice(3) - startTime.slice(3)) / 15
    const timeArrLength =
      ((endTime.slice(0, 2) - startTime.slice(0, 2)) * 60) / 15 +
      (endTime.slice(3) - startTime.slice(3)) / 15;
    const endIdTime = startIdTime + timeArrLength;
    //const dataCutArr = {startIdTime, endIdTime}
    console.log(timeArrLength);

    const indexRoom = rooms.findIndex((e) => e.name === dataDesk?.roomName);
    //console.log(indexRoom);
    const indexDesk = rooms[indexRoom]?.desks.findIndex(
      (e) => e.id === dataDesk?.id
    );
    //console.log(indexDesk);
    const newTimeArr = rooms[indexRoom].desks[indexDesk].arrTime;
    //console.log(fer);
    const reserveArr = [...newTimeArr.slice(startIdTime, endIdTime)];
    //console.log(reserveArr);
    let newReserveArr;
    if (reserveArr.some((e) => e < seats)) {
      //alert("1need new time or seats")
      setErrReserve(true);
    } else if (timeArrLength <= 0) {
      setErrReserve(true);
    } else {
      newReserveArr = reserveArr.map((e) => e - seats);
    }
    if (newReserveArr) {
      if (newReserveArr?.some((e) => e <= -1)) {
        //alert("3need new time or seats")
        setErrReserve(true);
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
      }
    }

    console.log(newReserveArr);
  };

  // console.log(rooms[indexRoom]?.desks[idDesk].arrTime);
  // console.log(idDesk);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.title}>{name}</span>
        <div className={styles.box}>
          {rooms[indexRoom].desks
            .filter((e) => e.name !== "")
            .map((desk, i) => (
              <Reserve
                key={i}
                errReserve={errReserve}
                desk={desk}
                dataDesk={dataDesk}
                setDataDesk={setDataDesk}
                reserveOneDesk={reserveOneDesk}
                rooms={rooms}
                indexRoom={indexRoom}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Room;
