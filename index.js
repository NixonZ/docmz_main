/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Store from './src/redux/config/store';
// import App from './App';
import AtomExample from './example/atomExample';
 
// AppRegistry.registerComponent(appName, () => AtomExample);

AppRegistry.registerHeadlessTask('SendSocketID', () =>
    require('./src/utils/SendSocketID'),
);

