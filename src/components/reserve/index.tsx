import React from "react";
import { IDesk, IRooms } from "../../models/model";
import styles from "../../pages/room/room.module.scss";

interface props {
  desk: IDesk;
  dataDesk: IDesk | null;
  setDataDesk: React.Dispatch<React.SetStateAction<IDesk | null>>;
  reserveOneDesk: (e: any) => void;
  rooms: IRooms[];
  indexRoom: number;
  errReserve: boolean;
}

const Reserve = ({
  desk,
  dataDesk,
  setDataDesk,
  reserveOneDesk,
  rooms,
  indexRoom,
  errReserve,
}: props) => {
  const [reserve, setReserve] = React.useState(false);

  const idDesk = rooms[indexRoom]?.desks.findIndex(
    (e) => e.id === dataDesk?.id
  );

  const reserveDesk = (desk: IDesk) => {
    setDataDesk(desk);
  };

  React.useEffect(() => {
    if (desk.id === dataDesk?.id) {
      setReserve(true);
    } else {
      setReserve(false);
    }
  }, [desk, dataDesk]);

  return (
    <>
      {!reserve && (
        <div className={styles.list}>
          <>
            {desk.name}
            <button onClick={() => reserveDesk(desk)}>reserve a table</button>
            <div>{desk.seats}</div>
          </>
        </div>
      )}
      {reserve && dataDesk && (
        <div>
          <form className={styles.form} onSubmit={reserveOneDesk}>
            {reserve && <>{desk.name}</>}
            {dataDesk?.seats && (
              <input
                type="number"
                defaultValue={1}
                min={1}
                max={dataDesk?.seats}
                required
              />
            )}
            <input
              defaultValue={dataDesk?.start}
              type="time"
              step="900"
              min={dataDesk?.start}
              max={dataDesk?.start.slice(0, 3)}
              required
            />
            <input
              defaultValue={dataDesk?.start.slice(0, 3) + "15"}
              type="time"
              step="900"
              min={dataDesk?.start.slice(0, 3) + "15"}
              max={dataDesk?.end}
              required
            />
            <button type="submit">Save</button>
            {reserve && <>{desk.seats}</>}
            <span>{errReserve && "change time or seats"}</span>
          </form>
          <div className={styles.icon__time}>
            <span>{dataDesk?.start}</span>
            {rooms[indexRoom]?.desks[idDesk].arrTime.map((n, i) => (
              <div
                key={i}
                className={
                  dataDesk.seats
                    ? n <= dataDesk.seats / 2
                      ? styles.desk__item_red
                      : styles.desk__item
                    : ""
                }
                title={"free seats: " + n}
              >
                🅞
              </div>
            ))}
            <span>{dataDesk?.end}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Reserve;
