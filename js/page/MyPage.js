import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';
import NavigationBar from '../common/NavigationBar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const THEME_COLOR = 'skyblue';
class MyPage extends Component {
  getRightButton() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => {}}>
          <View style={{padding: 5, marginRight: 8}}>
            <Feather name={'search'} size={24} style={{color: 'white'}} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  getLeftButton(callBack) {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{padding: 8, paddingLeft: 12}}
          onPress={callBack}>
          <Feather name={'chevron-left'} size={26} style={{color: 'white'}} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content',
    };
    let navigationBar = (
      <NavigationBar
        title={'我的'}
        statusBar={statusBar}
        style={{backgroundColor: THEME_COLOR}}
        rightButton={this.getRightButton()}
        leftButton={this.getLeftButton()}
      />
    );
    return (
      <View style={styles.container}>
        {navigationBar}
        <Text style={styles.welcome}>MyPage</Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});

export default connect(null, mapDispatchToProps)(MyPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 30,
  },
});
