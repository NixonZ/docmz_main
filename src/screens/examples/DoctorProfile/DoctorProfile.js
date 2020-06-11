import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import SolidHeader from '../../../components/organisms/SolidHeader/SolidHeader';
import RatingStarts from '../../../components/atoms/ratingStars/RatingStarts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ProfilePic from '../../../components/atoms/ProfilePic/ProfilePic';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import {TouchableOpacity} from 'react-native-gesture-handler';
function DoctorProfile() {
  const dimen = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(dimen, {
        toValue: 1,
        delay: 200,
        duration: 500,
        easing: Easing.elastic(),
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        delay: 200,
        duration: 500,
        easing: Easing.back(),
        useNativeDriver: true,
      }),
    ]).start();
  });
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <SolidHeader
        style={{
          Container: {
            height: '40%',
            borderBottomRightRadius: 70,
            height: dimen.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '40%'],
            }),
            width: dimen.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        }}>
        <Animated.View
          style={{flex: 1, opacity: opacity, transform: [{scale: opacity}]}}>
          <Text
            style={{
              fontSize: 36,
              fontWeight: '700',
              alignSelf: 'center',
              lineHeight: 36,
              color: '#fafafa',
            }}>
            Dr.Ekaterine
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              alignSelf: 'center',
              lineHeight: 22,
              color: '#f1f1f1',
            }}>
            Gynacologist
          </Text>
          <View style={{alignSelf: 'center', marginTop: 2}}>
            <RatingStarts rating={4} size={14} filled />
          </View>
        </Animated.View>
        <Animated.View
          style={{
            flex: 1.5,
            flexDirection: 'row',
            opacity: opacity,
            transform: [{scale: opacity}],
          }}>
          <View style={{flex: 3, alignItems: 'center'}}>
            <ProfilePic
              style={{
                Container: {
                  borderWidth: 10,
                  borderColor: '#fff',
                  borderRadius: 15,
                  height: 180,
                  width: 180,
                  bottom: -15,
                },
                Image: {
                  borderRadius: 10,
                  resizeMode: 'cover',
                },
              }}
              sourceurl={require('../../../assets/jpg/person1.jpg')}
            />
          </View>
          <View
            style={{
              flex: 2,
              borderBottomRightRadius: 70,
              justifyContent: 'center',
            }}>
            <View style={Styles.DoctorProfilePatientDetails}>
              <Fontisto name="doctor" size={32} color="#e1e1e1" />
              <View style={{marginLeft: 8}}>
                <Text style={{color: '#fff', fontSize: 15}}>1.5K</Text>
                <Text style={{color: '#e1e1e1', fontSize: 12}}>Patients</Text>
              </View>
            </View>
            <View style={Styles.DoctorProfileExperienceDetails}>
              <MaterialCommunityIcons
                name="timer-sand"
                size={30}
                color="#e1e1e1"
              />
              <View style={{marginLeft: 8}}>
                <Text style={{color: '#fff', fontSize: 15}}>5 Years</Text>
                <Text style={{color: '#e1e1e1', fontSize: 12}}>Experience</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </SolidHeader>
      <View style={Styles.ContentContainer}>
        <View style={Styles.ContentContainerTabs}>
          <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
            <Text
              style={{
                color: '#F09E4A',
                fontSize: 16,
                lineHeight: 16,
                fontWeight: '700',
              }}>
              About
            </Text>
            <View
              style={{
                height: 6,
                width: 6,
                borderRadius: 6,
                backgroundColor: '#F09E4A',
                marginBottom: -8,
                marginTop: 2,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                color: '#aaa',
                fontSize: 16,
                lineHeight: 16,
                fontWeight: '500',
              }}>
              Calendar
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#aaa',
                fontSize: 16,
                lineHeight: 16,
                fontWeight: '500',
              }}>
              Feedback
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#aaa',
                fontSize: 16,
                lineHeight: 16,
                fontWeight: '500',
              }}>
              More
            </Text>
          </View>
        </View>
        <ScrollView style={Styles.DoctorInfoScroll}>
          <View style={{flex: 1, paddingHorizontal: 25}}>
            <Text style={{letterSpacing: 0.3, lineHeight: 20}}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sedLorem
              ipsum dolor sit amet, consetetur sadipscing elitr, sed Lorem ipsum
              dolor sit amet, consetetur sadipscing elitr, sed Lorem ipsum dolor
              sit amet, consetetur sadipscing elitr, sed
            </Text>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            borderRadius: 40,
            borderWidth: 2,
            borderColor: '#F09E4A',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 2,
            backgroundColor: '#fff',
            marginRight: 8,
          }}>
          <MaterialCommunityIcons name="heart" size={28} color="#F09E4A" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 40,
            width: 180,
            borderRadius: 40,
            backgroundColor: '#F09E4A',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
            marginLeft: 8,
          }}>
          <Text style={{color: '#fff', fontWeight: '700', letterSpacing: 0.8}}>
            Book appointment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  DoctorProfilePatientDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  DoctorProfileExperienceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ContentContainer: {
    flex: 4,
    zIndex: 10,
  },
  ContentContainerTabs: {
    height: 40,
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 25,
  },
  DoctorInfoScroll: {
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
  },
});
export default DoctorProfile;
