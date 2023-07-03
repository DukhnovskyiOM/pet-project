import React from "react";
import "./oneDesk.scss";
import IconWorkPlace from "../../img/Work-Icon.png";
import BtnDelete from "../../img/btn-delete.png";
import AddDesk from "../../img/add-desk.png";
import { IDesk } from "../../models/model";
import { useDispatch } from "react-redux";
import { deleteDesk, editDesk } from "../../redux/room/room.slice";
import { useAppSelector } from "../../hooks/useAppSelection";

interface props {
  data: IDesk;
}

const OneDesk = ({ data }: props) => {
  const dispatch = useDispatch();
  const [save, setSave] = React.useState(false);

  const { rooms } = useAppSelector((state) => state.place);
  console.log(rooms);

  const addDesk = (e) => {
    e.preventDefault();

    const nameDesk = e.target[0].value;
    const numberSeats = e.target[1].value;
    const startTime = e.target[2].value;
    const endTime = e.target[3].value;

    const arrTime: number[] = new Array(
      ((endTime.slice(0, 2) - startTime.slice(0, 2)) * 60) / 15
    ).fill(Number(numberSeats));
    console.log(arrTime);

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
  };

  const delDesk = (e) => {
    const idDesk = data.id;
    const roomName = data.roomName;
    console.log(roomName, idDesk);
    dispatch(deleteDesk({ roomName, idDesk }));
    setSave(false);
  };

  return (
    <div className="wrapper__desk">
      <div className="wrap__left">
        {!save ? 
        <img width={100} height={100} src={IconWorkPlace} alt="Workplace" /> 
        : 
        <img width={100} height={100} src={AddDesk} alt="Workplace" />
        }
                {data?.seats && <img
              className="btn_delete"
              src={BtnDelete}
              alt="DeleteDesk"
              onClick={delDesk}
            />}
      </div>
      <div className="wrap__right">
         
          <form onSubmit={addDesk}>
            <input
              defaultValue={data?.name}
              className="input"
              type="text"
              placeholder="Name example: Desk-1"
              required
            />
            <input
              defaultValue={data?.seats ? data?.seats : ''}
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
              <input
                defaultValue={data?.start}
                type="time"
                step="3600"
                min="06:00"
                max="22:00"
              />
              End:
              <input
                defaultValue={data?.end}
                type="time"
                step="3600"
                min="07:00"
                max="23:00"
              />
            </span>
            <button type="submit">Save</button>
          </form>

      </div>
    </div>
  );
};

export default OneDesk;
