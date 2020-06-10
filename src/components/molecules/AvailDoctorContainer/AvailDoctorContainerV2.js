import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import BasicCard from '../../atoms/BasicCard/BasicCard';
import AvailDoctorContentV2 from '../AvailDoctorContent/AvailDoctorContentV2';
import ProfilePic from '../../atoms/ProfilePic/ProfilePic';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NavigationActions from 'react-navigation/src/NavigationActions';

function AvailDoctorContainerV2({
  onPress,
  name,
  schedule,
  navigation,
  id,
  data,
  toggle,
}) {
  console.log('Navigaton: ', id);
  useEffect(() => {
    // console.log('2222222222222222222222222222222222222222222222222');
    // console.log(schedule);
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  }, []);
  return (
    <View
      style={Styles.AvailableDoctorsCardContainer}
      onPress={() => navigation.navigate('docPatientStrem', {data: data})}>
      <BasicCard
        style={{
          CardContainer: Styles.AvailableDoctorsBasicCard,
        }}>
        <AvailDoctorContentV2
          toggle={toggle}
          DoctorName={`Dr.${name}`}
          rating={4}
          onPress={onPress}
          Specialization="General Dentist"
          schedule={schedule}
          navigation={navigation}
          data={data}
          Profile={
            <ProfilePic
              sourceurl={require('../../../assets/jpg/person1.jpg')}
              style={{
                Container: {
                  height: 60,
                  width: 60,
                  borderRadius: 60,
                },
                Image: {
                  borderRadius: 60,
                },
              }}
            />
          }
        />
      </BasicCard>
    </View>
  );
}

const Styles = StyleSheet.create({
  AvailableDoctorsCardContainer: {
    marginTop: 15,
  },
  AvailableDoctorsBasicCard: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    alignItems: 'flex-start',
    height: 'auto',
    position: 'relative',
    paddingBottom: 25,
  },
});
export default AvailDoctorContainerV2;
