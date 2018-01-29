// @flow

import React from 'react';
import * as Animatable from 'react-native-animatable';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const logo = require('../../assets/images/logo.png');

type Props = {
  start: () => void
};
export default class Announcement extends React.Component<Props, *> {
  render() {
    return (
      <View style={styles.background}>
        <Animatable.View
          style={styles.container}
          animation="flash"
          duration={200}
          iterationCount={10}
        >
          <Image source={logo} />
          <Text style={styles.title}>{'Ricochet\nRatfuck'}</Text>
          <Text style={styles.description}>
            These poor blind rat babies need food quick, or they'll starve. The
            more you move and more you wait, the more energy you spend, so be
            quick.
          </Text>

          <TouchableOpacity style={styles.button} onPress={this.props.start}>
            <Text style={styles.buttonText}>Get ratfucked</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FF24C1'
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  title: {
    textAlign: 'center',
    fontFamily: '04b',
    fontSize: 30,
    color: '#FF24C1',
    marginBottom: 20
  },
  description: {
    fontFamily: 'Pixeled',
    fontSize: 12,
    color: 'white'
  },
  button: {
    width: '80%',
    padding: 20,
    margin: 40,
    borderWidth: 3,
    borderColor: '#FF24C1'
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: '04b',
    fontSize: 20,
    color: '#FF24C1'
  }
});
