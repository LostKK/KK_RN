import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';

const TRENDING_URL = 'https://github.com/';
const THEME_COLOR = 'skyblue';
export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    const {projectModels} = this.params;
    this.url = projectModels.html_url || TRENDING_URL + projectModels.fullName;
    const title = projectModels.full_name || projectModels.fullName;
    this.state = {
      title: title,
      url: this.url,
      canGoBack: false,
    };
  }
  onBack() {}
  render() {
    let navigationBar = (
      <NavigationBar
        leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
        title={this.state.title}
        style={{backgroundColor: THEME_COLOR}}
        rightButton={this.renderRightButton()}
      />
    );
    return <View style={styles.container}>{navigationBar}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
