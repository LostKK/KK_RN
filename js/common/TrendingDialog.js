import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {PropTypes} from 'prop-types';
import TimeSpan from '../mo/TimeSpan';
export const TimeSpans = [
  new TimeSpans('今 天', 'since=daily'),
  new TimeSpans('本 周', 'since=weekly'),
  new TimeSpans('本 月', 'sincle=monthly'),
];

const NAV_BAR_HEIGHT_IOS = 44; //导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50; //导航栏在Android中的高度
const NAV_BAR_HEIGHT =
  Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID;
const STATUS_BAR_HEIGHT = 20; //状态栏的高度
const StatusBarShape = {
  //设置状态栏所接受的属性
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

export default class TrendingDialog extends Component {
  state = {
    visible: false,
  };

  show() {
    this.setState({
      visible: true,
    });
  }

  dismiss() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const {onClose, onSelect} = this.props;
    return (
      <Modal
        transparent={true}
        visible={this.state.visible}
        onRequestClose={() => onClose}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.dismiss()}>
          <MaterialIcons
            name={'arrow-drop-up'}
            size={36}
            style={styles.arrow}
          />
          <View style={styles.content}>
            {TimeSpan.map((result, i, arr) => {
              return (
                <TouchableOpacity
                  onPress={() => onSelect(arr[i])}
                  underlayColor="transparent">
                  <View style={styles.text_container}>
                    <Text style={styles.text}>{arr[i].showText}</Text>
                    {i !== TimeSpans.length - 1 ? (
                      <View style={styles.line} />
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    alignItems: 'center',
  },
  arrow: {
    marginTop: 40,
    color: 'white',
    padding: 0,
    margin: -15,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 3,
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 3,
  },
  text_container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    padding: 8,
    paddingLeft: 26,
    paddingRight: 26,
  },
  line: {
    height: 0.3,
    backgroundColor: 'darkgray',
  },
});
