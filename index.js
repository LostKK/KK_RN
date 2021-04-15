/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import WelcomePage from './js/page/WelcomePage';
import {name as appName} from './app.json';
import AppNavigators from './js/navigator/AppNavigators'
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => AppNavigators);
