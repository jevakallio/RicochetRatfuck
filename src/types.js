// @flow

export type Direction = 'up' | 'right' | 'down' | 'left';
export type Cell = {
  rat?: number,
  goal?: number,
  up?: number,
  right?: number,
  down?: number,
  left?: number
};

export type Row = [
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell
];
export type Grid = [
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row,
  Row
];
export type Coord = [number, number];
export type Rat = {
  coord: Coord,
  color: string
};
