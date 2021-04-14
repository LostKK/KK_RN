import React, {Component, component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class WelcomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>WelcomePage</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
