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

type Props = {
  gameOver: number => void
};
type State = {
  grid: GridType,
  rats: number[],
  livingRats: number[],
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
const INITIAL_LIFE_POINTS = 3;
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
    const points = [0, ...rats.map(() => INITIAL_LIFE_POINTS)];
    const selectedRat = shuffle(rats)[0];
    this.state = {
      grid: generateGrid(INITIAL_RATS),
      gameOver: false,
      rats,
      livingRats: [...rats],
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

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  selectRat = (id: number) => {
    this.setState({ selectedRat: id });
  };

  decrementPoints = () => {
    let selectedRat = this.state.selectedRat;
    let livingRats = this.state.livingRats;
    let currentGoalIndex = this.state.currentGoalIndex;
    let currentGoalRat = this.state.currentGoalRat;

    const updatedPoints = [...this.state.points];
    const rat = selectedRat;
    const ratPoints = updatedPoints[rat] - 1;

    if (ratPoints <= 0) {
      const deadRat = selectedRat;
      selectedRat = livingRats[0];
      livingRats = livingRats.filter(id => id !== rat);
      if (livingRats.length === 0) {
        this.props.gameOver(this.state.totalPoints);
        return;
      }

      if (deadRat === currentGoalRat) {
        currentGoalIndex = currentGoalIndex + 1;
        currentGoalRat = shuffle(livingRats)[0];
      }
    }

    updatedPoints[rat] = ratPoints;
    this.setState({
      selectedRat,
      currentGoalIndex,
      currentGoalRat,
      livingRats,
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
      // this.setState({
      //   announcementTitle: 'Oops',
      //   announcementDescription: 'That is illegal'
      // });
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
      nextState.currentGoalRat = shuffle(this.state.livingRats)[0];
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
