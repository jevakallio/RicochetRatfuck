// @flow

import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Grid from './Grid';
import type { Grid as GridType } from '../types';
import { generateGrid } from '../logic';

type Props = {
  children: any,
  keys: string[],
  degrees: number
};

type State = {};

const degrees = animated =>
  animated.interpolate({
    inputRange: [-360, 360],
    outputRange: ['-360deg', '360deg']
  });

export default class Tilt extends React.Component<Props, State> {
  value = new Animated.Value(0);

  componentDidMount() {
    this.animate(this.props.degrees);
  }

  animate = (range: number) => {
    const minDuration = 1000;
    const duration = 10 * 1000;

    Animated.timing(this.value, {
      toValue: Math.random() * range,
      duration: Math.max(minDuration, Math.random() * duration)
    }).start(() => {
      this.animate(-range);
    });
  };

  render() {
    const value = degrees(this.value);
    const keys = this.props.keys;

    const tilt = {
      flex: 1,
      transform: keys.map(key => ({ [key]: value }))
    };
    return <Animated.View style={tilt}>{this.props.children}</Animated.View>;
  }
}
