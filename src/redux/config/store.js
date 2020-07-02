import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';
import allReducer from '../reducer';
import MainNavigation from '../../navigations/MainNavigation';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-community/async-storage';
import Splash from '../../screens/examples/Splash/Splash';
// import Loading from '../../screens/loading/Loading'
import RealTimeOnline from '../../utils/RealTimeOnline';

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  whitelist: ['AuthReducer', 'patientAccountReducer', 'chatReducer'],
  blacklist: [
    'QuestionReducer',
    'DoctorReducer',
    'MyDoctorReducer',
    'AuthReducer.isLoading',
  ],
};

const pReducer = persistReducer(persistConfig, allReducer);

const _store = createStore(pReducer, {}, applyMiddleware(thunk, logger));
const store = persistStore(_store);

import io from 'socket.io-client';
global.socket = io.connect('http://192.168.0.179:4000', {
  secure: true,
  transports: ['websocket'],
  rejectUnauthorized: false,
});

export default function Store() {
  return (
    <Provider store={_store}>
      <PersistGate loading={null} persistor={store}>
        <MainNavigation />
        <RealTimeOnline />
      </PersistGate>
    </Provider>
  );
}
