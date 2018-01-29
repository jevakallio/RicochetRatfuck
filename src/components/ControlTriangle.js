// @flow

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import type { Direction } from '../types';

type Props = {
  color: string,
  rotate: number,
  onPress: () => void
};

export default class ControlTriangle extends React.Component<Props, *> {
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <View
          style={[
            styles.triangle,
            {
              borderBottomColor: this.props.color,
              transform: [{ rotate: `${this.props.rotate}deg` }]
            }
          ]}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent'
  }
});
