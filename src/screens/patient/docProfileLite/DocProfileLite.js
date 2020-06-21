import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text, Animated, ScrollView,Image} from 'react-native';
import FancyHeader from '../../../components/organisms/FancyHeader/FancyHeader';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BasicCard from '../../../components/atoms/BasicCard/BasicCard';
import DoctorProfile from '../../../components/molecules/DoctorProfile/DoctorProfile';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ConfirmAppointment from '../../../components/molecules/ConfirmAppointment/ConfirmAppointment';
import ProfilePic from '../../../components/atoms/ProfilePic/ProfilePic';
import {useDispatch, useSelector} from 'react-redux';
import {GettingDoctorProfiles} from '../../../redux/action/doctoreAction';
import VideoCall from '../../../components/molecules/VideoCall/VideoCall';
import CollapsibleFancyHeader from '../../../components/organisms/CollapsibleFancyHeader/CollapsibleFancyHeader';
import NavigationActions from 'react-navigation/src/NavigationActions';
import {AddFevDoc} from '../../../redux/action/patientAccountAction';

function DocProfileLite({navigation}) {
  const [confirmAppointment, setConfirmAppointment] = useState(false);
  const dispatch = useDispatch();
  const {tmp, tmpLoading} = useSelector(state => state.DoctorReducer);
  const authData = useSelector(state => state.AuthReducer);
  const {data} = navigation.state.params;

  useEffect(() => {
    console.log('-----------------------------------------');
    console.log(authData.data.id);
    console.log(data._id);
  }, []);
  const translateHeader = useRef(new Animated.Value(0)).current;

  const _checkLogedinAndDoTheStuff = () => {
    console.log('bug bug ', authData.isLogedin);
    if (!authData.isLogedin) {
      console.log('>> authentication.');
      navigation.navigate('authentication', {loginAs: 'patient'});
    } else {
       //navigation.navigate('ConfirmAppointment', {data: data});
      if (data.toggle === 0) {
        navigation.navigate('question', {data: data});
      } else {
        alert('open schedule popup');
      }
    }
  };

  const _checkLogedinAndAddToFavourites = () => {
    console.log('bug bug ', authData.isLogedin);
    if (!authData.isLogedin) {
      navigation.navigate('authentication');
    } else {
      dispatch(AddFevDoc(data._id, authData.data.id));
      // navigation.navigate('ConfirmAppointment', {data: data})
    }
  };
  const _checkLogedinAndVideoCall = () => {
    console.log('bug bug ', authData.isLogedin);
    if (!authData.isLogedin) {
      console.log('>> authentication.');
      navigation.navigate('authentication', {loginAs: 'patient'});
    } else {
       navigation.navigate('VideoCall', {data: data});
    }
  };
  return (
    <View style={DoctorDetailsScreenStyles.Container}>
      {/* <CollapsibleFancyHeader
        HeaderMax={250}
        HeaderMin={52}
        translateHeader={translateHeader}
        leftButtonClick={() => navigation.navigate('Home')}
        navigation={navigation}
        style={{
          Container: DoctorDetailsScreenStyles.HeaderContainer,
        }}>
        <Animated.Text
          style={[
            DoctorDetailsScreenStyles.HeaderTextDoctorName,
            {
              transform: [
                {
                  translateX: translateHeader.interpolate({
                    inputRange: [0, 198], //250-52
                    outputRange: [0, -80],
                    extrapolate: 'clamp',
                    easing: Easing.back(),
                  }),
                },
                {
                  translateY: translateHeader.interpolate({
                    inputRange: [0, 198],
                    outputRange: [0, -8],
                    extrapolate: 'clamp',
                    easing: Easing.back(),
                  }),
                },
              ],
              fontSize: translateHeader.interpolate({
                inputRange: [0, 198],
                outputRange: [30, 20],
                extrapolate: 'clamp',
                easing: Easing.back(),
              }),
            },
          ]}>
          Dr.Haley
        </Animated.Text>
        <Text style={DoctorDetailsScreenStyles.HeaderTextDoctorSpecialization}>
          General dentist
        </Text>
        <View
          style={DoctorDetailsScreenStyles.HeaderViewDoctorExperienceDetails}>
          <View
            style={
              DoctorDetailsScreenStyles.HeaderViewDoctorExperienceDetailsPatients
            }>
            <Fontisto name="doctor" size={38} color="#e1e1e1" />
            <View style={{marginLeft: 5}}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                1.5K
              </Text>
              <Text style={{color: '#e1e1e1'}}>Patients</Text>
            </View>
          </View>
          <View
            style={
              DoctorDetailsScreenStyles.HeaderViewDoctorExperienceDetailsExperience
            }>
            <MaterialCommunityIcons
              name="timer-sand"
              size={38}
              color="#e1e1e1"
            />
            <View>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                5 Years
              </Text>
              <Text style={{color: '#e1e1e1'}}>Experience</Text>
            </View>
          </View>
        </View>
        <ProfilePic
          style={{
            Container: DoctorDetailsScreenStyles.DoctorProfilePic,
            Image: {borderRadius: 100},
          }}
          sourceurl={require('../../../assets/jpg/person2.jpg')}
        />
      </CollapsibleFancyHeader> */}
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: translateHeader}}},
        ])}>
        <FancyHeader
          profileMode={true}
          leftButtonClick={() => navigation.navigate('Home')}
          rightButtonClick={() =>
            navigation.navigate(
              'pageNavigation',
              {},
              NavigationActions.navigate({routeName: 'patientHomePage'}),
            )
          }
          navigation={navigation}
          style={{
            Container: DoctorDetailsScreenStyles.HeaderContainer,
          }}>
          <Text style={DoctorDetailsScreenStyles.HeaderTextDoctorName}>
            Dr. {data.basic.name}
          </Text>
          <Text
            style={DoctorDetailsScreenStyles.HeaderTextDoctorSpecialization}>
            General dentist
          </Text>
          <View
            style={DoctorDetailsScreenStyles.HeaderViewDoctorExperienceDetails}>
            <View
              style={
                DoctorDetailsScreenStyles.HeaderViewDoctorExperienceDetailsPatients
              }>
              <Fontisto name="doctor" size={38} color="#e1e1e1" />
              <View style={{marginLeft: 5}}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                  1.5K
                </Text>
                <Text style={{color: '#e1e1e1'}}>Patients</Text>
              </View>
            </View>
            <View
              style={
                DoctorDetailsScreenStyles.HeaderViewDoctorExperienceDetailsExperience
              }>
              <MaterialCommunityIcons
                name="timer-sand"
                size={38}
                color="#e1e1e1"
              />
              <View>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                  5 Years
                </Text>
                <Text style={{color: '#e1e1e1'}}>Experience</Text>
              </View>
            </View>
          </View>

          <ProfilePic
            style={{
              Container: DoctorDetailsScreenStyles.DoctorProfilePic,
              Image: {borderRadius: 100},
            }}
            sourceurl={require('../../../assets/jpg/person2.jpg')}
          />
        </FancyHeader>

        <DoctorProfile />
        {/* <ConfirmAppointment /> */}
        <View style={DoctorDetailsScreenStyles.BottomActionBar}>
          <TouchableOpacity
            style={{flex: 2, padding: 5}}
            onPress={() => _checkLogedinAndAddToFavourites()}>
            <BasicCard
              style={{
                CardContainer: {
                  height: '100%',
                  width: '100%',
                },
              }}>
              <MaterialCommunityIcons name="heart" size={28} color="#6231CB" />
            </BasicCard>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 2, padding: 5}}
            onPress={() => _checkLogedinAndVideoCall()}>
            <BasicCard
              style={{
                CardContainer: {
                  height: '100%',
                  width: '100%',
                },
              }}>
              <Image style={{height:40,width:40}} source={require('../../../assets/icons/v1.jpg')}/>
            </BasicCard>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 6, padding: 5}}
            onPress={() => _checkLogedinAndDoTheStuff()}>
            <BasicCard
              active
              style={{
                CardContainer: {
                  height: '100%',
                  width: '100%',
                  backgroundColor: '#F4C130',
                },
              }}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>
                {data.toggle === 0
                  ? 'Book Appointment'
                  : 'Schedule Appointment'}
              </Text>
            </BasicCard>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const DoctorDetailsScreenStyles = StyleSheet.create({
  Container: {flex: 1, backgroundColor: '#fff'},
  HeaderContainer: {
    backgroundColor: '#7774F5',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    position: 'relative',
    zIndex: 999,
  },
  DoctorProfilePic: {
    height: 120,
    width: 120,
    borderWidth: 10,
    zIndex: 9999,
    borderRadius: 100,
    borderColor: '#fff',
    transform: [
      {
        translateX: 40,
      },
      {
        translateY: 15,
      },
    ],
  },
  HeaderTextDoctorName: {
    textAlign: 'center',
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: -50,
    letterSpacing: 1,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  HeaderTextDoctorSpecialization: {
    textAlign: 'center',
    color: '#eee',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  HeaderViewDoctorExperienceDetails: {
    flexDirection: 'row',
    marginTop: 10,
  },
  HeaderViewDoctorExperienceDetailsPatients: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderViewDoctorExperienceDetailsExperience: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  BottomActionBar: {
    height: 60,
    width: '100%',
    // position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 999,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default DocProfileLite;
