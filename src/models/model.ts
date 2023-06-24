export interface IRooms {
  name: string;
  desks: IDesk[];
}

export interface IRoomState {
  rooms: IRooms | null;
}

export interface IDesk {
  id: number;
  name: string;
  seats: number;
  start: string;
  end: string;
}
