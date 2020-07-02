//#EB4B2B
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Animated,
  useWindowDimensions,
  Easing,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {useDispatch, useSelector} from 'react-redux';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import AnimInput from '../../../components/molecules/AnimInput/AnimInput';
import GoogleIcon from '../../../assets/svg/google.svg';
import FacebookIcon from '../../../assets/svg/facebook.svg';
// import ExpandableButton from '../../../components/organisms/ExpandableButton/ExpandableButton';
import {
  signupDoctor,
  signupPatient,
  removeUser,
} from '../../../redux/action/auth';

import ImagePicker from 'react-native-image-picker';
import LoadingButton from '../../../components/atoms/LoadingButton/LoadingButton';

function DmzSignup(props) {
  const [data, setData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    registration_number: '',
    specialty: '',
    basic: '',
    city: '',
    state: '',
    country: '',
    appointmentsString: '',
    phone: '',
    referralId: '',
    imagePath: '',
  });
  const {signupAs = 'patient'} = props.navigation.state.params;
  // const [loading, setLoading] = useState(true);
  const [isDoctor, setDoctor] = useState(signupAs === 'doctor');
  const {isLoading} = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const Dimen = useWindowDimensions();
  const screenWidth = Dimen.width;
  const screenHeight = Dimen.height;
  const [heightOffset, setHeightOffset] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   return dispatch(removeUser());
  // }, []);

  const onChoosePicture = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    console.log(granted);
    if (granted) {
      PickImage();
    } else {
      askPermission();
    }
  };
  const askPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'DocMz needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        PickImage();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const PickImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};
        // console.log(source);
        const path = response.fileName;
        setData({...data, imagePath: path});
      }
    });
  };

  const handelEmailChange = e => {
    setData({...data, email: e});
  };

  const handelPasswordChange = e => {
    setData({...data, password: e});
  };

  const handelFirstNameChange = e => {
    setData({...data, firstName: e});
  };
  const handelLastNameChange = e => {
    setData({...data, lastName: e});
  };
  const handleAppointmentsChange = e => {
    setData({...data, appointmentsString: e});
  };

  const handelPhoneChange = e => {
    setData({...data, phone: e});
  };

  const handleBasicChanges = e => {
    setData({...data, basic: e});
  };

  const handelRegistrationNumberChange = e => {
    setData({...data, registration_number: e});
  };

  const handelSpecialty = e => {
    setData({...data, specialty: e});
  };
  const handleRefererChange = e => {
    setData({...data, referralId: e});
  };

  const handelCityChange = e => {
    setData({...data, city: e});
  };
  const handelStateChange = e => {
    setData({...data, state: e});
  };

  const handelCountryChange = e => {
    setData({...data, country: e});
  };
  const handleDescriptionChange = e => {
    setData({...data, description: e});
  };
  const handleFeeChange = e => {
    setData({...data, fee: e});
  };
  const onLayout = props => {
    if (heightOffset !== props.nativeEvent.layout.y)
      setHeightOffset(props.nativeEvent.layout.y);
  };

  const onPress = callback => {
    // Animated.timing(opacity, {
    //   toValue: 1,
    //   duration: 1000,
    //   delay: 200,
    //   easing: Easing.in(),
    //   useNativeDriver: false,
    // }).start(() => {
    //   callback();
    // });
    signupAs === 'doctor' ? _handleDoctorSignup() : _handlePatientSignup();
  };

  const _handleDoctorSignup = () => {
    dispatch(signupDoctor(data, successCallback, errorCallback));
  };
  const _handlePatientSignup = () => {
    dispatch(signupPatient(data, successCallback, errorCallback));
  };

  const successCallback = () => {
    showTost('account created successfully');
    // isDoctor
    //   ? props.navigation.navigate('pageNavigation')
    //   : props.navigation.goBack(null);
    props.navigation.goBack(null);
  };
  const errorCallback = e => {
    showTost('error occured: ' + e);
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
    <ScrollView style={{paddingTop: '5%', backgroundColor: '#fff'}}>
      <Animated.View
        style={{
          flex: 1,
          alignItems: 'center',
          opacity: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}>
        <View style={{flexDirection: 'row'}}>
          <DmzText
            text={'Signup as ' + signupAs}
            type={3}
            lite
            style={{color: '#EB4B2B'}}
          />
          {/* <DmzText text={loginAs} type={3} lite style={{marginLeft: 5}} /> */}
        </View>
      </Animated.View>
      <View
        onLayout={onLayout}
        style={{
          flex: 10,
          paddingTop: 0,
          //   backgroundColor: 'red',
        }}>
        <DmzText
          text="Welcome!"
          type={4}
          lite
          gap_small
          style={{marginLeft: 'auto', marginRight: 'auto'}}
        />
        <Animated.View
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
            marginTop: 20,
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
            style={{Container: {borderBottomWidth: 0, height: 40}}}
            inputHandler={handelEmailChange}
          />
        </Animated.View>
        <Animated.View
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
            marginTop: 20,
            marginLeft: 25,
            marginRight: 25,
            opacity: opacity.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [1, 0, 0],
            }),
          }}>
          <AnimInput
            withAnim={false}
            secureText={true}
            placeholder="Password"
            style={{Container: {borderBottomWidth: 0, height: 40}}}
            inputHandler={handelPasswordChange}
          />
        </Animated.View>
        <Animated.View
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
            marginTop: 20,
            marginLeft: 25,
            marginRight: 25,
            opacity: opacity.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [1, 0, 0],
            }),
          }}>
          <AnimInput
            withAnim={false}
            placeholder="Fist Name"
            style={{Container: {borderBottomWidth: 0, height: 40}}}
            inputHandler={handelFirstNameChange}
          />
        </Animated.View>
        <Animated.View
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
            marginTop: 20,
            marginLeft: 25,
            marginRight: 25,
            opacity: opacity.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [1, 0, 0],
            }),
          }}>
          <AnimInput
            withAnim={false}
            placeholder="Last Name"
            style={{Container: {borderBottomWidth: 0, height: 40}}}
            inputHandler={handelLastNameChange}
          />
        </Animated.View>
        {isDoctor && (
          <>
            <Animated.View
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: 10,
                marginTop: 20,
                marginLeft: 25,
                marginRight: 25,
                opacity: opacity.interpolate({
                  inputRange: [0, 0.8, 1],
                  outputRange: [1, 0, 0],
                }),
              }}>
              <AnimInput
                withAnim={false}
                placeholder="Registration Number"
                style={{Container: {borderBottomWidth: 0, height: 40}}}
                inputHandler={handelRegistrationNumberChange}
              />
            </Animated.View>

            <Animated.View
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: 10,
                marginTop: 20,
                marginLeft: 25,
                marginRight: 25,
                opacity: opacity.interpolate({
                  inputRange: [0, 0.8, 1],
                  outputRange: [1, 0, 0],
                }),
              }}>
              <AnimInput
                withAnim={false}
                placeholder="Specialty"
                style={{Container: {borderBottomWidth: 0, height: 40}}}
                inputHandler={handelSpecialty}
              />
            </Animated.View>
            <Animated.View
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: 10,
                marginTop: 20,
                marginLeft: 25,
                marginRight: 25,
                opacity: opacity.interpolate({
                  inputRange: [0, 0.8, 1],
                  outputRange: [1, 0, 0],
                }),
              }}>
              <AnimInput
                withAnim={false}
                placeholder="Basic"
                style={{Container: {borderBottomWidth: 0, height: 40}}}
                inputHandler={handleBasicChanges}
              />
            </Animated.View>
          </>
        )}
        <Animated.View
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
            marginTop: 20,
            marginLeft: 25,
            marginRight: 25,
            opacity: opacity.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [1, 0, 0],
            }),
          }}>
          <AnimInput
            withAnim={false}
            placeholder="City"
            style={{Container: {borderBottomWidth: 0, height: 40}}}
            inputHandler={handelCityChange}
          />
        </Animated.View>
        <Animated.View
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
            marginTop: 20,
            marginLeft: 25,
            marginRight: 25,
            opacity: opacity.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [1, 0, 0],
            }),
          }}>
          <AnimInput
            withAnim={false}
            placeholder="State"
            style={{Container: {borderBottomWidth: 0, height: 40}}}
            inputHandler={handelStateChange}
          />
        </Animated.View>
        <Animated.View
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
            marginTop: 20,
            marginLeft: 25,
            marginRight: 25,
            opacity: opacity.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [1, 0, 0],
            }),
          }}>
          <AnimInput
            withAnim={false}
            placeholder="Country"
            style={{Container: {borderBottomWidth: 0, height: 40}}}
            inputHandler={handelCountryChange}
          />
        </Animated.View>
        {isDoctor && (
          <Animated.View
            style={{
              backgroundColor: '#f5f5f5',
              borderRadius: 10,
              marginTop: 20,
              marginLeft: 25,
              marginRight: 25,
              opacity: opacity.interpolate({
                inputRange: [0, 0.8, 1],
                outputRange: [1, 0, 0],
              }),
            }}>
            <AnimInput
              withAnim={false}
              placeholder="Appointments"
              style={{Container: {borderBottomWidth: 0, height: 40}}}
              inputHandler={handleAppointmentsChange}
            />
          </Animated.View>
        )}
        <Animated.View
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
            marginTop: 20,
            marginLeft: 25,
            marginRight: 25,
            opacity: opacity.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [1, 0, 0],
            }),
          }}>
          <AnimInput
            withAnim={false}
            placeholder="Phone"
            style={{Container: {borderBottomWidth: 0, height: 40}}}
            inputHandler={handelPhoneChange}
          />
        </Animated.View>
        <Animated.View
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
            marginTop: 20,
            marginLeft: 25,
            marginRight: 25,
            opacity: opacity.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [1, 0, 0],
            }),
            marginBottom: 20,
          }}>
          <AnimInput
            withAnim={false}
            placeholder="Referer"
            style={{Container: {borderBottomWidth: 0, height: 40}}}
            inputHandler={handleRefererChange}
          />
        </Animated.View>
        <View
          style={{
            backgroundColor: '#f5f5f5',
            padding: 10,
            borderRadius: 10,
            marginLeft: 25,
            marginRight: 25,
            marginBottom: 25,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={onChoosePicture}>
            <Text>{!data.imagePath ? 'Upload picture' : 'Picture path'}</Text>
          </TouchableOpacity>
          <Text>{data.imagePath}</Text>
        </View>
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
          isLoading={isLoading}
          text={'Signup'}
          onClick={onPress}
        />
      </View>
      <Animated.View
        style={{
          flex: 2,
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
            <DmzText text="Sign up" style={{marginLeft: 20}} lite />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <GoogleIcon height={18} width={18} />
            <DmzText text="Sign up" style={{marginLeft: 20}} lite />
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <DmzText text="Already have an account? " lite type={3} />
          <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
            <DmzText text=" Sign in" lite type={3} style={{color: '#EB4B2B'}} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

export default DmzSignup;
