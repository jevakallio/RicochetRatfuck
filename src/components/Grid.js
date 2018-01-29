// @flow

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Cell from './Cell';
import type { Grid as GridType } from '../types';

type Props = {
  grid: GridType
};

const screen = Dimensions.get('window');

export default class Grid extends React.Component<Props, *> {
  render() {
    const { grid } = this.props;
    const cellSize = screen.width * 0.8 / grid.length;
    return (
      <View style={styles.container}>
        {grid.map((row, r) => (
          <View key={r} style={styles.row}>
            {row.map((cell, c) => (
              <Cell
                key={c}
                row={r}
                col={c}
                max={grid.length - 1}
                size={cellSize}
                cell={cell}
              />
            ))}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  }
});
