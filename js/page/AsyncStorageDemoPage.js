import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationUtil from '../navigator/NavigationUtil';

// type Props = {};
const KEY = 'save_key';
export default class AsyncStorageDemoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>AsyncStorage 使用</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            this.value = text;
          }}
        />
        <View style={styles.input_container}>
          <Button title={'存储'} onPress={() => this.doSave()} />
          <Button title={'删除'} onPress={() => this.doRemove()} />
          <Button title={'获取'} onPress={() => this.doGetData()} />
        </View>
        <Text>{this.state.showText}</Text>
      </View>
    );
  }

  doSave = async () => {
    try {
      await AsyncStorage.setItem(KEY, this.value);
      alert('存储成功' + this.value);
    } catch (error) {
      console.log(error);
    }
  };

  doRemove = async () => {
    try {
      await AsyncStorage.removeItem(KEY);
      alert('删除成功' + this.value);
    } catch (error) {
      console.log(error);
    }
  };

  doGetData = async () => {
    try {
      await AsyncStorage.getItem(KEY).then(res => {
        this.setState({
          showText: res,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
    lineHeight: 50,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
