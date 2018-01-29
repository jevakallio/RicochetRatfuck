// @flow

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { range, shuffle } from 'lodash';
import Grid from './Grid';
import Tilt from './Tilt';
import Controls from './Controls';
import RatPicker from './RatPicker';
import Announcement from './Announcement';
import { getRatColor } from '../colors';
import type { Rat, Direction, Grid as GridType } from '../types';
import { generateGrid, findRat, moveToRicochetPoint } from '../logic';

type Props = {};
type State = {
  grid: GridType,
  rats: number[],
  ratfucks: {
    lightsOut: boolean,
    rotate: number,
    tilt: number
  },
  points: number[],
  totalPoints: number,
  currentGoalIndex: number,
  currentGoalRat: number,
  selectedRat: number,
  announcementTitle: string,
  announcementDescription: string
};

const INITIAL_RATS = 4;

// lights out
// rotate
// drunk
// shuffle
// block

export default class Game extends React.Component<Props, State> {
  _interval = null;

  constructor(props: Props) {
    super(props);
    const rats = range(1, INITIAL_RATS + 1);
    const points = [0, ...rats.map(() => 10)];
    const selectedRat = shuffle(rats)[0];
    this.state = {
      grid: generateGrid(INITIAL_RATS),
      rats,
      ratfucks: {
        lightsOut: false,
        rotate: 0,
        tilt: 0
      },
      points,
      totalPoints: 0,
      selectedRat,
      currentGoalIndex: 1,
      currentGoalRat: selectedRat,
      announcementTitle: '',
      announcementDescription: ''
    };
  }

  componentDidMount() {
    this._interval = setInterval(this.decrementPoints, 1000);
  }

  selectRat = (id: number) => {
    this.setState({ selectedRat: id });
  };

  decrementPoints = () => {
    const updatedPoints = [...this.state.points];
    const rat = this.state.selectedRat;
    const ratPoints = updatedPoints[rat] - 1;

    if (ratPoints % 10 === 0) {
      // this.setState({
      //   announcementTitle: this.state.announcementTitle + '!'
      // });
    }

    updatedPoints[rat] = ratPoints;
    this.setState({
      points: updatedPoints,
      totalPoints: this.state.totalPoints + 1
    });
  };

  incrementPoints = () => {
    const updatedPoints = [...this.state.points];
    const rat = this.state.selectedRat;
    updatedPoints[rat] += 100;

    this.setState({
      points: updatedPoints,
      totalPoints: this.state.totalPoints + 100
    });
  };

  moveRat = (direction: Direction) => {
    const grid = this.state.grid;
    const prev = findRat(grid, this.state.selectedRat);
    const next = moveToRicochetPoint(grid, prev, direction);
    if (!next || prev === next) {
      this.setState({
        announcementTitle: 'Oops',
        announcementDescription: 'That is illegal'
      });
      return;
    }

    grid[next[0]][next[1]].rat = this.state.selectedRat;
    grid[prev[0]][prev[1]].rat = undefined;

    const nextState: $Shape<State> = { grid };
    if (
      grid[next[0]][next[1]].goal === this.state.currentGoalIndex &&
      this.state.selectedRat === this.state.currentGoalRat
    ) {
      nextState.currentGoalIndex = this.state.currentGoalIndex + 1;
      nextState.currentGoalRat = shuffle(this.state.rats)[0];
      this.incrementPoints();
    }

    this.setState(nextState, this.decrementPoints);
  };

  render() {
    return (
      <View style={styles.container}>
        <Tilt keys={['rotateX', 'rotateY']} degrees={this.state.ratfucks.tilt}>
          <Tilt keys={['skewX', 'skewY']} degrees={this.state.ratfucks.tilt}>
            <Grid
              grid={this.state.grid}
              currentGoalIndex={this.state.currentGoalIndex}
              currentGoalRat={this.state.currentGoalRat}
            />

            <Controls
              color={getRatColor(this.state.selectedRat)}
              onDirectionPress={this.moveRat}
              points={this.state.points[this.state.selectedRat]}
            />
          </Tilt>
        </Tilt>
        <RatPicker
          rats={this.state.rats}
          points={this.state.points}
          selected={this.state.selectedRat}
          onSelect={this.selectRat}
        />
        <Announcement
          title={this.state.announcementTitle}
          description={this.state.announcementDescription}
        />
        <Text style={styles.elapsedTime}>
          {`${this.state.totalPoints} pts`}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    backgroundColor: 'black',
    flex: 1
  },
  elapsedTime: {
    position: 'absolute',
    top: 32,
    right: 36,
    height: 32,
    textAlign: 'right',
    color: 'white',
    fontFamily: 'Pixeled',
    fontSize: 12
  }
});
