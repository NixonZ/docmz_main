import React, {useRef, useState} from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  Easing,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import ToggleDot from '../../atoms/ToggleDot/ToggleDot';
import {TouchableOpacity} from 'react-native-gesture-handler';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
function ToggleButton({
  text0,
  text1,
  style,
  onToggle,
  toggle,
  textStyle,
  dotStyle = {},
}) {
  const onTouch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggle();
  };
  return (
    <Animated.View
      style={[
        ToggleButtonStyles.Container,
        {
          flexDirection: !toggle ? 'row' : 'row-reverse',
        },
        style ? style : null,
      ]}>
      <TouchableOpacity onPress={onTouch}>
        <Text style={[ToggleButtonStyles.Text, textStyle ? textStyle : null]}>
          {toggle ? text0 : text1}
        </Text>
      </TouchableOpacity>
      <ToggleDot style={{...dotStyle}} />
    </Animated.View>
  );
}

const ToggleButtonStyles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    // width: 70,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Text: {
    color: '#6231CB',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 5,
  },
});
export default ToggleButton;
