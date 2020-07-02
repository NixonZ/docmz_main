import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Text, Animated, Easing} from 'react-native';
import DmzText from '../../atoms/DmzText/DmzText';
import PropType from 'prop-types';
import {TextInput} from 'react-native-gesture-handler';
/**
 *
 * @param {String} textContentType content type of the input
 * @param {String} placeholder placeholder for the input
 * @param {String} keyboardType keyboard type of the input {default:'default'}
 * @param {Boolean} withAnim whether animatable or not {default:true}
 * @param {Object} style custom styles
 * @param {function} inputHandler
 *
 */

function AnimInput(props) {
  const placeholderTranslate = useRef(new Animated.Value(0)).current;
  const [inputText, setInputText] = useState('');
  const {
    textContentType,
    placeholder,
    keyboardType = 'default',
    secureText = false,
    withAnim = true,
    style,
    inputHandler = () => {},
    value,
  } = props;

  useEffect(() => {
    value && setssInputText(value);
    value && onFocus();
  });
  const onFocus = () => {
    Animated.timing(placeholderTranslate, {
      toValue: 1,
      easing: Easing.elastic(),
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const onBlur = () => {
    if (inputText === '') {
      Animated.timing(placeholderTranslate, {
        toValue: 0,
        easing: Easing.elastic(),
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };
  const handleText = text => {
    setInputText(text);
    inputHandler(text);
  };
  const customContainerStyle = [
    Styles.Container,
    style ? style.Container : null,
  ];
  const customAnimatedPlaceholderStyle = [
    Styles.PlaceholderText,
    {
      transform: [
        {
          translateY: placeholderTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -20],
          }),
        },
        {
          translateX: placeholderTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -5],
          }),
        },
      ],
      color: placeholderTranslate.interpolate({
        inputRange: [0, 1],
        outputRange: ['#777', '#000'],
      }),
    },
    style ? style.Placeholder : null,
  ];
  const customInputStyle = [Styles.Input, style ? style.Input : null];

  return (
    <View style={customContainerStyle}>
      {withAnim ? (
        <Animated.Text style={customAnimatedPlaceholderStyle}>
          {placeholder}
        </Animated.Text>
      ) : null}
      <TextInput
        textContentType={textContentType}
        placeholder={withAnim ? '' : placeholder}
        secureTextEntry={secureText}
        keyboardType={keyboardType}
        style={customInputStyle}
        onFocus={onFocus}
        onBlur={onBlur}
        value={inputText}
        onChangeText={handleText}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    height: 'auto',
    width: '100%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // marginTop: 5,
  },
  PlaceholderText: {
    position: 'absolute',
    left: 10,
  },
  Input: {
    left: 10,
    // marginTop: 5,
  },
});

// AnimInput.prototype = {
//   textContentType: PropType.string,
//   placeholder: PropType.string,
//   keyboardType: PropType.string,
//   withAnim: PropType.bool,
// };
export default AnimInput;
