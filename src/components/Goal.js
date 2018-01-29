// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';

import { getRatColor } from '../colors';
import type { Cell as CellType } from '../types';

type Props = {
  id: number,
  size: number
};

export default class Rat extends React.Component<Props, *> {
  render() {
    const { id, size } = this.props;
    return (
      <View
        style={[
          styles.rat,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: getRatColor(id)
          }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  rat: {}
});
