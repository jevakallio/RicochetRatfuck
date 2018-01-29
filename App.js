/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Game from './src/components/Game';
import LaunchScreen from './src/components/LaunchScreen';

type State = {
  isStarted: boolean,
  isFinished: boolean,
  points: number
};

export default class App extends Component<*, State> {
  state = {
    isStarted: false,
    isFinished: false,
    points: 0
  };

  render() {
    return this.state.isStarted && !this.state.isFinished ? (
      <Game
        gameOver={points => {
          this.setState({
            isFinished: true,
            points
          });
        }}
      />
    ) : (
      <LaunchScreen
        retry={this.state.isFinished}
        points={this.state.points}
        start={() =>
          this.setState({
            isStarted: true,
            isFinished: false
          })
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
