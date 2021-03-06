import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  DeviceInfo,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';
import TrendingItem from '../common/TrendingItem';
import Toast from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';
import TrendingDialog, {TimeSpans} from '../common/TrendingDialog';
import {connect} from 'react-redux';
import actions from '../action/index';
import {Flag_STORAGE} from '../expand/dao/DataStore';
import FavoriteDao from '../expand/dao/FavoriteDao';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';
const URL = 'https://github.com/trending/';
const QUERY_STR = '&sort=starts';
const THEME_COLOR = 'skyblue';
const favoriteDao = new FavoriteDao(Flag_STORAGE.flag_trending);
import FavoriteUtil from '../util/FavoriteUtil';
export default class TrendingPage extends Component {
  constructor(props) {
    super(props);
    this.tabNames = ['All', 'C', 'C#', 'PHP', 'JAVAScript'];
    this.state = {
      timeSpan: TimeSpans[0],
    };
  }

  _genTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => (
          <TrendingTabPage
            {...this.props}
            timeSpan={this.state.timeSpan}
            tabLabel={item}
          />
        ),
        navigationOptions: {
          title: item,
        },
      };
    });
    return tabs;
  }

  renderTitleView() {
    return (
      <View>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={() => this.dialog.show()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                color: '#ffffff',
                fontWeight: '400',
              }}>
              ??????{this.state.timeSpan.showText}
              <MaterialIcons
                name={'arrow-drop-down'}
                size={22}
                style={{color: 'white'}}
              />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  onSelectTimeSpan(tab) {
    this.dialog.dismiss();
    this.setState({
      timeSpan: tab,
    });
    DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab);
  }

  renderTrendingDialog() {
    return (
      <TrendingDialog
        ref={dialog => (this.dialog = dialog)}
        onSelect={tab => this.onSelectTimeSpan(tab)}
      />
    );
  }

  _tabNav() {
    if (!this.tabNav) {
      //????????????:????????????????????????????????????TabNavigator,??????tab????????????????????????
      this.tabNav = createAppContainer(
        createMaterialTopTabNavigator(this._genTabs(), {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false,
            scrollEnabled: true,
            style: {
              backgroundColor: 'orange',
              // height: 30,
            },
            indicatorStyle: styles.indicatorStyle,
            labelStyle: styles.labelStyle,
          },
        }),
      );
    }
    return this.tabNav;
  }

  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content',
    };
    let navigationBar = (
      <NavigationBar
        titleView={this.renderTitleView()}
        statusBar={statusBar}
        style={{backgroundColor: THEME_COLOR}}
      />
    );
    const TabNavigator = this._tabNav();
    return (
      <View
        style={{flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
        {navigationBar}
        {TabNavigator && <TabNavigator />}
        {this.renderTrendingDialog()}
      </View>
    );
  }
}

const pageSize = 10; // ????????????,????????????
class TrendingTab extends Component {
  constructor(props) {
    super(props);
    const {tabLabel, timeSpan} = this.props;
    this.storeName = tabLabel;
    this.timeSpan = timeSpan;
  }

  componentDidMount() {
    this.loadData();
    this.timeSpanChangeListener = DeviceEventEmitter.addListener(
      EVENT_TYPE_TIME_SPAN_CHANGE,
      timeSpan => {
        this.timeSpan = timeSpan;
        this.loadData();
      },
    );
  }

  loadData(loadData) {
    const {onRefreshTrending, onLoadMoreTrending} = this.props;
    const store = this._store();
    const url = this.genFetchUrl(this.storeName);
    if (loadData) {
      onLoadMoreTrending(
        this.storeName,
        ++store.pageIndex,
        pageSize,
        store.items,
        favoriteDao,
        callback => {
          console.log('???????????????');
          this.toast.show('???????????????');
        },
      );
    } else {
      onRefreshTrending(this.storeName, url, pageSize, favoriteDao);
    }
  }

  /**
   *
   * @param ????????????????????????????????????
   * @returns {*}
   * @private
   */
  _store() {
    const {trending} = this.props;
    let store = trending[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [], // ??????????????????
        hideLoadingMore: true, //????????????????????????
      };
    }
    return store;
  }

  genFetchUrl(key) {
    return URL + key + '?' + this.timeSpan.searchText;
  }

  renderItem(data) {
    const item = data.item;
    return (
      <TrendingItem
        projectModel={item}
        onSelect={callback => {
          NavigationUtil.goPage(
            {projectModel: item, flag: Flag_STORAGE.flag_trending, callback},
            'DetailPage',
          );
        }}
        onFavorite={(item, isFavorite) =>
          FavoriteUtil.onFavorite(
            favoriteDao,
            item,
            isFavorite,
            Flag_STORAGE.flag_popular,
          )
        }
      />
    );
  }

  genIndicator() {
    return this._store().hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator} />
        <Text>??????????????????????????? 3?????????</Text>
      </View>
    );
  }

  render() {
    const {Trending} = this.props;
    let store = this._store();
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModels}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + item.item.fullName}
          refreshControl={
            <RefreshControl
              title={'loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={THEME_COLOR}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            console.log('--onEndReached--');
            setTimeout(() => {
              if (this.canLoadMore) {
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true; // fix: ???????????????????????????onEndReached?????????
            console.log('--onMementumScrollBegin--');
          }}
        />
        <Toast ref={toast => (this.toast = toast)} position={'center'} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  trending: state.trending,
});

const mapDispatchToProps = dispatch => ({
  onRefreshTrending: (storeName, url, pageSize, favoriteDao) =>
    dispatch(actions.onRefreshTrending(storeName, url, pageSize, favoriteDao)),
  onLoadMoreTrending: (storeName, url, pageSize, item, favoriteDao, callBack) =>
    dispatch(
      actions.onLoadMoreTrending(
        storeName,
        url,
        pageSize,
        item,
        favoriteDao,
        callBack,
      ),
    ),
});

const TrendingTabPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrendingTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tabStyle: {
    minWidth: 50,
    // padding: 0,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6,
    // margin: 0,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
});
