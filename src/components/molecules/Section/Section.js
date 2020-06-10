import React from 'react';
import {View, StyleSheet} from 'react-native';
import DmzText from '../../atoms/DmzText/DmzText';

function Section({HeaderText, children, style}) {
  return (
    <View style={[Styles.Container, style ? style.Container : null]}>
      <DmzText
        text={HeaderText}
        style={[
          {fontSize: 22, marginBottom: 15, marginLeft: 25},
          style ? style.Text : null,
        ]}
      />
      {children}
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    width: '100%',
    padding: 5,
  },
});

export default Section;
