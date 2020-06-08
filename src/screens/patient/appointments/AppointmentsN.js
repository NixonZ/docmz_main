import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import FancyHeaderLite from '../../../components/organisms/FancyHeaderLite/FancyHeaderLite';
import Container from '../../../components/organisms/Container/Container';
import {Image} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AppointmentsN = ({navigation}) => (
  <View style={{flex: 1, backgroundColor: '#fff'}}>
    <FancyHeaderLite
      navigation={navigation}
      onLeftButtonPress={() => navigation.goBack(null)}
      headerText={'Appointment'}
      style={{Section: {overflow: 'hidden', height: '20%', marginBottom: 0}}}
    />
    <Container
      style={{
        height: '75%',
        transform: [{translateY: -30}],
        zIndex: 999,
        backgroundColor: '#fff',
        padding: 5,
        paddingTop: 15,
      }}>
      <View style={styles.topBar}>
        <Text style={styles.text}>Goals</Text>
        <Text style={styles.text}>Health</Text>
        <Text style={styles.text}>Treatment</Text>
      </View>

      <View style={styles.doctorInfo}>
        <View style={styles.row}>
          <Image
            source={require('../../../assets/jpg/person1.jpg')}
            style={[styles.smallIcons, styles.doctorImg]}
          />
          <View>
            <Text style={styles.text}>Dr. Howie</Text>
            <Text>Dermatologist</Text>
          </View>
        </View>

        <View style={[styles.row, {alignItems: 'center'}]}>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#4FC670',
              marginHorizontal: 5,
            }}
          />
          <Text>available</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.row}>
          <Image
            source={require('../../../assets/icons/syringe.png')}
            style={styles.smallIcons}
          />
          <Text style={styles.text}>Painful breathing & heartburn</Text>
        </View>

        <View style={styles.row}>
          <Image
            source={require('../../../assets/icons/bandage.png')}
            style={styles.smallIcons}
          />
          <Text style={styles.text}>12:45 pm - 1:00 pm</Text>
        </View>

        <TouchableOpacity>
          <Text style={[styles.text, styles.link]}>View Details</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonRow]}>
        <TouchableOpacity>
          <View style={[styles.button, {backgroundColor: '#F7C033'}]}>
            <Text style={[styles.text, {color: 'white'}]}>Voice Call</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={[styles.button, {backgroundColor: '#6230CC'}]}>
            <Text style={[styles.text, {color: 'white'}]}>Video Call</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Container>
  </View>
);

export default AppointmentsN;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  doctorInfo: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 40,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  doctorImg: {
    borderRadius: 25,
    borderColor: '#F7C033',
    borderWidth: 3,
  },
  body: {
    margin: 30,
  },
  smallIcons: {
    height: 50,
    width: 50,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 22,
  },
  link: {
    color: '#6230CC',
    textDecorationLine: 'underline',
    textDecorationColor: '#6230CC',
    marginStart: 70,
  },
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'center',
    marginTop: 40,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 22,
    paddingHorizontal: 30,
    marginHorizontal: 10,
  },
});
