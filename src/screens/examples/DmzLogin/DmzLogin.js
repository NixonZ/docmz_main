//#EB4B2B
import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, ScrollView, Animated} from 'react-native';
import Toast from 'react-native-root-toast';
import {useDispatch, useSelector} from 'react-redux';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import AnimInput from '../../../components/molecules/AnimInput/AnimInput';
import GoogleIcon from '../../../assets/svg/google.svg';
import FacebookIcon from '../../../assets/svg/facebook.svg';

import {
  LoginDoctor,
  LoginPatient,
  removeUser,
} from '../../../redux/action/auth';
import {_LoginPatient} from '../../../redux/action/authAction';
import LoadingButton from '../../../components/atoms/LoadingButton/LoadingButton';

function DmzLogin(props) {
  const {loginAs = 'patient'} = props.navigation.state.params;
  const [data, setData] = useState({
    email: '',
    password: '',
    socketID: global.socket.id,
  });
  const [isDoctor, setDoctor] = useState(false);
  const dispatch = useDispatch();
  const authData = useSelector(state => state.AuthReducer);
  const [heightOffset, setHeightOffset] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;

  const onLayout = props => {
    if (heightOffset !== props.nativeEvent.layout.y)
      setHeightOffset(props.nativeEvent.layout.y);
  };

  const successCallback = successResponce => {
    showTost(successResponce.message.toString());
    console.log(`PatientLoginAction(success):  ${successResponce.message}`);
    // console.log(authData);
    // dispatch(GetPatientInfo())
    isDoctor
      ? props.navigation.navigate('pageNavigation')
      : props.navigation.goBack(null);
    // props.navigation.navigate('pageNavigation', {}, NavigationActions.navigate({routeName: 'patientHomePage'}));
  };

  const errorCallback = faildResponce => {
    showTost(faildResponce.message.toString());
    console.log(`PatientLoginAction(error):  ${faildResponce.message}`);
  };

  const _handelPatientLogin = () => {
    console.log(data);
    dispatch(LoginPatient(data, successCallback, errorCallback));
    // setTimeout(() => {
    //   dispatch(removeUser())
    // }, 30000);
  };

  const _handelDoctorLogin = () => {
    console.log(data);
    dispatch(LoginDoctor(data, successCallback, errorCallback));
    // setTimeout(() => {
    //   dispatch(removeUser())
    // }, 10000);
  };

  const showTost = (msg = 'nothing') => {
    return Toast.show(msg, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      },
    });
  };

  return (
    <ScrollView style={{paddingTop: '25%', backgroundColor: '#fff'}}>
      <Animated.View
        style={{
          flex: 3,
          alignItems: 'center',
          paddingTop: 30,
          opacity: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}>
        <View style={{flexDirection: 'row'}}>
          <DmzText
            text={'Login as '}
            type={3}
            lite
            style={{color: '#EB4B2B'}}
          />
          <DmzText text={loginAs} type={3} lite style={{marginLeft: 5}} />
        </View>
      </Animated.View>
      <View
        onLayout={onLayout}
        style={{
          flex: 6,
          paddingTop: 0,
          //   backgroundColor: 'red',
        }}>
        <DmzText
          text="Welcome Back!"
          type={4}
          lite
          gap_small
          style={{marginLeft: 'auto', marginRight: 'auto'}}
        />
        <Animated.View
          style={{
            backgroundColor: '#eee',
            borderRadius: 15,
            marginTop: 40,
            marginLeft: 25,
            marginRight: 25,
            opacity: opacity.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [1, 0, 0],
            }),
          }}>
          <AnimInput
            withAnim={false}
            placeholder="Email"
            style={{Container: {borderBottomWidth: 0}}}
            inputHandler={txt => setData({...data, email: txt})}
          />
        </Animated.View>

        <Animated.View
          style={{
            backgroundColor: '#eee',
            borderRadius: 15,
            marginTop: 20,
            marginLeft: 25,
            marginRight: 25,
            marginBottom: 20,
            opacity: opacity.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [1, 0, 0],
            }),
          }}>
          <AnimInput
            withAnim={false}
            placeholder="Password"
            style={{
              Container: {borderBottomWidth: 0},
              input: {backgroundColor: 'pink'},
            }}
            inputHandler={txt => setData({...data, password: txt})}
          />
        </Animated.View>
        {/* <ExpandableButton
          width={screenWidth * 0.8}
          height={52}
          expandedHeight={screenHeight * 0.8}
          expandedTop={heightOffset}
          expandedWidth={screenWidth}
          onPress={onPress}
          buttonText={
            <DmzText
              text="Login"
              type={3}
              gap_small
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                color: '#f1f1f1',
              }}
            />
          }
        /> */}

        <LoadingButton
          isLoading={authData.isLoading}
          text={'Login'}
          onClick={() =>
            loginAs === 'doctor' ? _handelDoctorLogin() : _handelPatientLogin()
          }
        />

        <DmzText
          text="Forgot Password?"
          lite
          gap_small
          style={{marginLeft: 'auto', marginRight: 'auto', color: '#EB4B2B'}}
        />
      </View>
      <Animated.View
        style={{
          flex: 3,
          padding: 25,
          alignItems: 'center',
          opacity: opacity.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0, 0],
          }),
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '60%',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <FacebookIcon height={18} width={18} />
            <DmzText text="Sign in" style={{marginLeft: 20}} lite />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <GoogleIcon height={18} width={18} />
            <DmzText text="Sign in" style={{marginLeft: 20}} lite />
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <DmzText text="Don't have an account? " lite type={3} />
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('signupScreen', {signupAs: loginAs})
            }>
            <DmzText text=" Sign Up" lite type={3} style={{color: '#EB4B2B'}} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

export default DmzLogin;
