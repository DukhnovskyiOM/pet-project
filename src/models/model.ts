export interface IRooms {
  name: string;
  desks: IDesk[];
}

export interface IRoomState {
  rooms: [] | null;
}

export interface IDesk {
  id: number;
  name: string;
  roomName: string;
  seats: number;
  start: string;
  end: string;
}
