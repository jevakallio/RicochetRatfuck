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
  isRunning: boolean
};

export default class App extends Component<*, State> {
  state = {
    isRunning: false
  };
  render() {
    return true || this.state.isRunning ? (
      <Game />
    ) : (
      <LaunchScreen start={() => this.setState({ isRunning: true })} />
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
