// @flow

import React from 'react';
import * as Animatable from 'react-native-animatable';
import { View, StyleSheet, Modal, Text } from 'react-native';

type Props = {
  title: string,
  description: string
};

type State = {
  isVisible: boolean
};

export default class Announcement extends React.Component<Props, State> {
  state = {
    isVisible: false
  };
  componentWillReceiveProps({ title }: Props) {
    if (title !== this.props.title) {
      this.setState(
        {
          isVisible: true
        },
        () => {
          setTimeout(() => this.setState({ isVisible: false }), 3000);
        }
      );
    }
  }
  render() {
    return (
      <Modal
        visible={this.state.isVisible}
        transparent={true}
        pointerEvents="none"
      >
        <Animatable.View
          style={styles.container}
          key={this.props.title}
          animation="flash"
          duration={500}
        >
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
        </Animatable.View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: '04b',
    fontSize: 30,
    color: '#FF24C1',
    marginBottom: 80
  },
  description: {
    fontFamily: 'Pixeled',
    fontSize: 18,
    color: '#FF24C1'
  }
});
