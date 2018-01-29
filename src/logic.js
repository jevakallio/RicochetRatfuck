// @flow
import { take, shuffle } from 'lodash';
import { createGrid, createGoals } from './data';
import type { Grid, Coord, Cell, Direction, Rat } from './types';
export type Move = -1 | 0 | 1;
export type Moves = { [d: Direction]: [Move, Move] };

const initialRats = [[7, 7], [7, 8], [8, 7], [8, 8]];

const possibleMoves: Moves = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1]
};

export function generateGrid(ratCount: number): Grid {
  // @todo generate
  const grid = createGrid();
  const goals = createGoals();

  take(initialRats, ratCount).forEach(([row, col], index) => {
    grid[row][col] = { ...grid[row][col], rat: index + 1 };
  });

  shuffle(goals).forEach(([row, col], index) => {
    grid[row][col] = { ...grid[row][col], goal: index + 1 };
  });

  return grid;
}

export function canMove(grid: Grid, coord: Coord, direction: Direction) {
  const [row, col] = coord;
  const gridSize = grid.length - 1;
  switch (direction) {
    case 'up':
      return (
        row > 0 &&
        !grid[row][col].up &&
        !grid[row - 1][col].down &&
        !grid[row - 1][col].rat
      );
    case 'right':
      return (
        col < gridSize &&
        !grid[row][col].right &&
        !grid[row][col + 1].left &&
        !grid[row][col + 1].rat
      );
    case 'down':
      return (
        row < gridSize &&
        !grid[row][col].down &&
        !grid[row + 1][col].up &&
        !grid[row + 1][col].rat
      );
    case 'left':
      return (
        col > 0 &&
        !grid[row][col].left &&
        !grid[row][col - 1].right &&
        !grid[row][col - 1].rat
      );
  }
}

export function findByProperty(grid: Grid, comparator: Cell => boolean): Coord {
  const size = grid.length;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (comparator(grid[row][col])) {
        return [row, col];
      }
    }
  }

  throw new Error('Item not found');
}

export function findRat(grid: Grid, rat: number): Coord {
  return findByProperty(grid, cell => cell.rat === rat);
}

export function findGoal(grid: Grid, goal: number): Coord {
  return findByProperty(grid, cell => cell.goal === goal);
}

export function moveNextOrStay(
  grid: Grid,
  coord: Coord,
  direction: Direction
): Coord {
  if (canMove(grid, coord, direction)) {
    const move = possibleMoves[direction];
    return [coord[0] + move[0], coord[1] + move[1]];
  }

  return coord;
}

export function moveToRicochetPoint(
  grid: Grid,
  prev: Coord,
  direction: Direction
) {
  const next = moveNextOrStay(grid, prev, direction);
  if (prev !== next) {
    return moveToRicochetPoint(grid, next, direction);
  }

  return next;
}
