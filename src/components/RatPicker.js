// @flow

import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Rat from './Rat';
import {
  getRatColor,
  getUnselectedRatIcon,
  getSelectedRatIcon
} from '../colors';
import type { Cell as CellType } from '../types';

type Props = {
  rats: number[],
  selected: number,
  onSelect: number => void
};

export default class RatPicker extends React.Component<Props, *> {
  render() {
    const { selected, rats } = this.props;
    return (
      <View style={styles.container}>
        {rats.map(id => (
          <TouchableOpacity
            key={id}
            style={styles.button}
            activeOpacity={0.6}
            onPress={() => this.props.onSelect(id)}
          >
            <Image
              style={styles.rat}
              source={
                id === selected
                  ? getSelectedRatIcon(id)
                  : getUnselectedRatIcon(id)
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 30,
    justifyContent: 'space-between',
    marginBottom: 40
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 15
  },
  rat: {
    height: 40,
    width: 60,
    resizeMode: 'contain'
  }
});
