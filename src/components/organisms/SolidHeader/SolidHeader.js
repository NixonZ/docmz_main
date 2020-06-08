import React from 'react';
import {StyleSheet, Animated} from 'react-native';
import TopNavBar from '../../molecules/TopNavBar/TopNavBar';

function SolidHeader({children, style}) {
  return (
    <Animated.View style={[Styles.Container, style ? style.Container : null]}>
      <TopNavBar
        style={{marginTop: 20}}
        onLeftButtonPress={() => {}}
        onRightButtonPress={() => {}}
      />
      {children}
    </Animated.View>
  );
}

const Styles = StyleSheet.create({
  Container: {backgroundColor: '#2D6CCB', height: 'auto'},
});
export default SolidHeader;
