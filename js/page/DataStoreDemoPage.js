import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DataStore from '../expand/dao/DataStore';

// type Props = {};
const KEY = 'save_key';
export default class DataStoreDemoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: '',
    };
    this.dataStore = new DataStore();
  }

  loadData() {
    let url = `https://api.github.com/search/repositories?q=${this.value}`;
    this.dataStore
      .fetchData(url)
      .then(data => {
        let showData = `初次数据加载时间：${new Date(
          data.timestamp,
        )}\n${JSON.stringify(data.data)}`;
        this.setState({
          showText: showData,
        });
      })
      .catch(error => {
        error && console.log(error.toString());
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>离线缓存框架设计</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            this.value = text;
          }}
        />
        <View style={styles.input_container}>
          <Button title={'获取'} onPress={() => this.loadData()} />
        </View>
        <Text>{this.state.showText}</Text>
      </View>
    );
  }
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
