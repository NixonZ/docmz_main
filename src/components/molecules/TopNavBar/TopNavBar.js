import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import NavBackButton from '../../../assets/svg/nav_back.svg';
import NavHamButton from '../../../assets/svg/nav_ham.svg';

import {PRIMARY} from '../../../styles/colors';

import DmzText from '../../atoms/DmzText/DmzText';

function TopNavBar({
  onLeftButtonPress = () => navigation.goBack(null),
  onRightButtonPress = () => navigation.openDrawer(),
  headerText,
  LeftComp,
  RightComp,
  isClap = false,
  navigation,
  style,
  hideRightComp,
  hideLeftComp,
}) {
  return (
    <Animated.View
      style={[
        Styles.Container,
        isClap && {
          backgroundColor: PRIMARY,
          height: 80,
          marginTop: 0,
        },
        hideLeftComp && hideRightComp ? {justifyContent: 'center'} : null,
        style ? style : null,
      ]}>
      {!hideLeftComp && (
        <TouchableOpacity
          style={Styles.TouchableOpacity}
          onPress={onLeftButtonPress}>
          {!LeftComp ? <NavBackButton style={Styles.BackButton} /> : LeftComp}
        </TouchableOpacity>
      )}
      <DmzText
        text={headerText}
        style={{
          fontSize: 20,
          color: '#fff',
          alignSelf: 'center',
        }}
      />
      {!hideRightComp && (
        <TouchableOpacity
          style={Styles.TouchableOpacity}
          // onPress={() => onRightButtonPress()}>
          onPress={() => onRightButtonPress()}>
          {!RightComp ? (
            <NavHamButton style={Styles.HamburgerButton} />
          ) : (
            RightComp
          )}
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    zIndex: 900,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  TouchableOpacity: {
    padding: 10,
    borderRadius: 20,
  },
  BackButton: {height: 20},
  HamburgerButton: {height: 20, width: 20, marginRight: 5},
});
export default TopNavBar;
