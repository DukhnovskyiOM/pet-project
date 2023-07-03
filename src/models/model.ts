export interface IRooms {
  name: string;
  desks: IDesk[];
}

export interface IRoomState {
  rooms: IRooms[];
}

export interface IDesk {
  id: number;
  name: string;
  roomName: string;
  seats: number | null;
  start: string;
  end: string;
  arrTime: number[];
}
