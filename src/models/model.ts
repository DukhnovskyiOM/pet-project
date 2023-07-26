export interface IDesk {
  id: number;
  name: string;
  roomName: string;
  seats: number | null;
  start: string;
  end: string;
  arrTime: number[];
}

export interface IRooms {
  id?: number;
  name: string;
  email: string | null;
  desks: IDesk[];
}

export interface IRoomState {
  rooms: IRooms[];
  loading: boolean;
  error: string | null;
}

