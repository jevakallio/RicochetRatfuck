// @flow

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ControlTriangle from './ControlTriangle';
import type { Direction } from '../types';

type Props = {
  color: string,
  points: number,
  onDirectionPress: Direction => void
};

const Placeholder = () => <View style={{ flex: 1 }} />;
export default class Rat extends React.Component<Props, *> {
  render() {
    const { color, points, onDirectionPress } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Placeholder />
          <ControlTriangle
            color={color}
            onPress={() => onDirectionPress('up')}
            rotate={0}
            align="flex-end"
          />
          <Placeholder />
        </View>
        <View style={styles.row}>
          <ControlTriangle
            color={color}
            onPress={() => onDirectionPress('left')}
            rotate={-90}
          />
          <View style={styles.points}>
            <Text style={[styles.pointsText, { color: color }]}>{points}</Text>
            <Text style={[styles.pointsLabel, { color: color }]}>seconds</Text>
          </View>
          <ControlTriangle
            color={color}
            onPress={() => onDirectionPress('right')}
            rotate={90}
          />
        </View>
        <View style={styles.row}>
          <Placeholder />
          <ControlTriangle
            color={color}
            onPress={() => onDirectionPress('down')}
            rotate={180}
          />
          <Placeholder />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    transform: [{ scale: 0.8 }]
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  points: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pointsText: {
    fontFamily: 'Pixeled',
    fontSize: 18
  },
  pointsLabel: {
    fontFamily: 'Pixeled',
    fontSize: 12
  }
});
