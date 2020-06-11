import React, {useEffect, useState} from 'react';
import {StyleSheet, Animated} from 'react-native';
import TopNavBar from '../../molecules/TopNavBar/TopNavBar';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector} from 'react-redux';

function SolidHeader({children, style}) {
  const {theme, isThemeChanging} = useSelector(state => state.themeReducer);
  return (
    <Animated.View
      style={[
        Styles.Container,
        theme === 1 ? Styles.themeOne : Styles.themeTwo,
        style ? style.Container : null,
      ]}>
      <TopNavBar
        style={{marginTop: 15}}
        onLeftButtonPress={() => {}}
        onRightButtonPress={() => {}}
      />
      {children}
    </Animated.View>
  );
}

const Styles = StyleSheet.create({
  Container: {height: 'auto'},
  themeOne: {
    backgroundColor: '#2D6CCB',
  },
  themeTwo: {
    backgroundColor: '#2FCCFF',
  },
});
export default SolidHeader;
