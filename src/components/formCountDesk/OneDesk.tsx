import React from "react";
import "./formCountDesk.css";
import "./oneDesk.scss";
import IconWorkPlace from "../../img/Work-Icon.png";
import BtnDelete from "../../img/btn-delete.png";
import AddDesk from "../../img/add-desk.png";
import { IDesk } from "../../models/model";
//import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import { editDesk } from "../../redux/room/room.slice";
import { useAppSelector } from "../../hooks/useAppSelection";
// import {actions} from '../../redux/room/room.slice'

interface props {
  data: IDesk;
}

const OneDesk = ({ data }: props) => {
  const dispatch = useDispatch();
  console.log(data, "data");

  const addDesk = (e: any) => {
    e.preventDefault();
    //     const idDesk = deskN.id
    const nameDesk = e.target[0].value;
    const numberSeats = e.target[1].value;
    const startTime = e.target[2].value;
    const endTime = e.target[3].value;

    dispatch(
      editDesk({
        id: data.id,
        name: nameDesk,
        seats: numberSeats,
        start: startTime,
        end: endTime,
      })
    );
    //     console.log(idDesk);
    //     const nameRoom =deskN.nameRoom

    //     dispatch(actions.deskAdd({nameDesk, numberSeats, startTime, endTime, idDesk, nameRoom}))
  };

  const delDesk = (e: any) => {
    //     console.log(e);
    //     const id = deskN.id
    //     const nameRoom =deskN.nameRoom
    //     dispatch(actions.deskDel({nameRoom, id}))
  };

  return (
    <div className="wrapper__desk">
      <div className="wrap__left">
        <img width={100} height={100} src={IconWorkPlace} alt="Workplace" />
      </div>
      <div className="wrap__right">
        {!data.name ? (
          <form onSubmit={addDesk}>
            <input
              defaultValue={data?.name}
              className="input"
              type="text"
              placeholder="Name example: Desk-1"
              required
            />
            <input
              defaultValue={data?.seats}
              className="input"
              type="number"
              placeholder="Number of seats example: 4"
              step="1"
              min="0"
              max="100"
              required
            />
            <span>
              Start:
              <input defaultValue={data?.start} type="time" />
              End:
              <input defaultValue={data?.end} type="time" />
            </span>
            <button type="submit">Save</button>
          </form>
        ) : (
          <>
            <img
              className="btn_delete"
              src={BtnDelete}
              alt="DeleteDesk"
              onClick={delDesk}
            />
            <div className="add__desk">
              <img width={80} height={80} src={AddDesk} alt="Workplace" />
              <span>Desk add</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OneDesk;
