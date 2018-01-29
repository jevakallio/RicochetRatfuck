// @flow

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { range } from 'lodash';
import Grid from './Grid';
import Tilt from './Tilt';
import Controls from './Controls';
import RatPicker from './RatPicker';
import { getRatColor } from '../colors';
import type { Rat, Direction, Grid as GridType } from '../types';
import { generateGrid, findRat, moveToRicochetPoint } from '../logic';

type Props = {};
type State = {
  grid: GridType,
  tilt: number,
  rats: number[],
  selectedRat: number
};

const INITIAL_RATS = 4;
export default class Game extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      grid: generateGrid(INITIAL_RATS),
      rats: range(1, INITIAL_RATS + 1),
      selectedRat: 1,
      tilt: 0
    };
  }

  selectRat = (id: number) => {
    this.setState({ selectedRat: id });
  };

  moveRat = (direction: Direction) => {
    const grid = this.state.grid;
    const prev = findRat(grid, this.state.selectedRat);
    const next = moveToRicochetPoint(grid, prev, direction);
    if (!next || prev === next) {
      return;
    }

    grid[next[0]][next[1]].rat = this.state.selectedRat;
    grid[prev[0]][prev[1]].rat = undefined;
    this.setState({
      grid
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Tilt keys={['rotateX', 'rotateY']} degrees={this.state.tilt}>
          <Tilt keys={['skewX', 'skewY']} degrees={this.state.tilt}>
            <Grid grid={this.state.grid} />
          </Tilt>
          <Controls
            color={getRatColor(this.state.selectedRat)}
            onDirectionPress={this.moveRat}
          />
          <RatPicker
            rats={this.state.rats}
            selected={this.state.selectedRat}
            onSelect={this.selectRat}
          />
        </Tilt>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1
  }
});
