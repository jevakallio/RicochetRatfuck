// @flow

import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RatPickerItem from './RatPickerItem';
import type { Cell as CellType } from '../types';

type Props = {
  rats: number[],
  points: number[],
  selected: number,
  onSelect: number => void
};

export default class RatPicker extends React.Component<Props, *> {
  render() {
    const { selected, rats, points } = this.props;
    return (
      <View style={styles.container}>
        {rats.map(id => (
          <RatPickerItem
            key={id}
            id={id}
            points={points[id]}
            isSelected={id === selected}
            onSelect={this.props.onSelect}
          />
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
  }
});
