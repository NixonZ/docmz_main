import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {changingTheme, setTheme} from '../../../redux/action/themeAction';
function Settings() {
  const {isThemeChanging} = useSelector(state => state.themeReducer);
  const dispatch = useDispatch();
  const onPressTheme = theme => {
    dispatch(changingTheme());
    AsyncStorage.setItem('theme', `${theme}`)
      .then(res => {
        getTheme();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getTheme = () => {
    AsyncStorage.getItem('theme')
      .then(res => {
        console.log(res);
        dispatch(setTheme(Number(res)));
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
      }}>
      {isThemeChanging && <ActivityIndicator />}
      <TouchableOpacity
        onPress={() => onPressTheme(1)}
        style={{
          height: 40,
          width: '80%',
          backgroundColor: 'rgba(21,123,200,0.9)',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>theme 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressTheme(2)}
        style={{
          height: 40,
          width: '80%',
          backgroundColor: 'rgba(21,123,200,0.9)',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>theme 2</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Settings;
