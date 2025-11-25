export enum Player {
  PLAYERONE,
  PLAYERTWO,
  NONE,
}

export interface columnConfig {
  column: string;
  range: [number, number];
  freeSpace: boolean;
}

export interface BoardConfig {
  boardSize: number;
  columns: columnConfig[];
}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'win' | 'lose';
  duration: number;
}
