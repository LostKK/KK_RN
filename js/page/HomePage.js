import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import BackPressComponent from '../common/BackPressComponent';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from '../navigator/NavigationUtil';
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.backPress = new BackPressComponent({backPress: this.onBackPress()});
  }

  componentDidMount() {
    this.backPress.componentDidMount;
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount;
  }

  onBackPress = () => {
    // const {dispatch, nav} = this.props;
    // if (nav.routes[1].index === 0) {
    //   return false;
    // }
    // dispatch(NavigationActions.back());
    return true;
  };

  render() {
    // fix: DynamicTabNavigator中的页面无法跳转到外层导航器页面的问题
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator />;
  }
}
