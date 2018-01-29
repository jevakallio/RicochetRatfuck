// @flow

import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Rat from './Rat';
import {
  getRatColor,
  getUnselectedRatIcon,
  getSelectedRatIcon
} from '../colors';
import type { Cell as CellType } from '../types';

type Props = {
  id: number,
  points: number,
  isSelected: boolean,
  onSelect: number => void
};

export default class RatPickerItem extends React.Component<Props, *> {
  _containerRef = null;
  _pointsRef = null;
  componentWillReceiveProps({ points }: Props) {
    // increment points
    if (points > this.props.points && this._pointsRef) {
      this._pointsRef.fadeInDown();
    }

    // kill rat
    if (points < 0 && this.props.points >= 0 && this._containerRef) {
      this._containerRef.fadeOutDown();
    }
  }
  render() {
    const { points, id, isSelected, onSelect } = this.props;
    return (
      <Animatable.View
        ref={ref => (this._containerRef = ref)}
        style={styles.container}
      >
        <TouchableOpacity
          key={id}
          style={styles.button}
          activeOpacity={0.6}
          onPress={() => onSelect(id)}
        >
          <Image
            style={styles.rat}
            source={
              isSelected ? getSelectedRatIcon(id) : getUnselectedRatIcon(id)
            }
          />
          <Animatable.Text
            style={styles.points}
            ref={pointsRef => (this._pointsRef = pointsRef)}
          >
            {points}
          </Animatable.Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    padding: 15
  },
  rat: {
    height: 40,
    width: 60,
    resizeMode: 'contain'
  },
  points: {
    color: 'white',
    fontFamily: 'Pixeled',
    fontSize: 12
  }
});
