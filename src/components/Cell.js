// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';

import Rat from './Rat';
import type { Cell as CellType } from '../types';

type Props = {
  size: number,
  max: number,
  row: number,
  col: number,
  cell: CellType
};

export default class Cell extends React.Component<Props, *> {
  render() {
    const { size, cell, col, row, max } = this.props;
    return (
      <View
        style={[
          styles.cell,
          { width: size, height: size },
          (cell.up || row === 0) && styles.up,
          (cell.right || col === max) && styles.right,
          (cell.down || row === max) && styles.down,
          (cell.left || col === 0) && styles.left
        ]}
      >
        {cell.rat ? <Rat id={cell.rat} size={size * 0.8} /> : null}
      </View>
    );
  }
}

const GRID_WIDTH = 1;
const GRID_COLOR = '#FF24C1';
const WALL_WIDTH = 3;
const WALL_COLOR = '#50E3C2';

const styles = StyleSheet.create({
  cell: {
    borderTopWidth: GRID_WIDTH,
    borderTopColor: GRID_COLOR,
    borderRightWidth: GRID_WIDTH,
    borderRightColor: GRID_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  goal: {
    backgroundColor: 'white'
  },
  up: {
    borderTopWidth: WALL_WIDTH,
    borderTopColor: WALL_COLOR
  },
  down: {
    borderBottomWidth: WALL_WIDTH,
    borderBottomColor: WALL_COLOR
  },
  left: {
    borderLeftWidth: WALL_WIDTH,
    borderLeftColor: WALL_COLOR
  },
  right: {
    borderRightWidth: WALL_WIDTH,
    borderRightColor: WALL_COLOR
  }
});
