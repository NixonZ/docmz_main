import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import FancyHeaderLite from '../../../components/organisms/FancyHeaderLite/FancyHeaderLite';
import Container from '../../../components/organisms/Container/Container';
import {Image} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';

const WaitingRoomEntry = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FancyHeaderLite
        navigation={navigation}
        onLeftButtonPress={() => navigation.goBack(null)}
        headerText={'Waiting Room'}
        style={{Section: {overflow: 'hidden', height: '20%', marginBottom: 0}}}
      />
      <Container
        style={{
          height: '90%',
          transform: [{translateY: -30}],
          zIndex: 999,
          backgroundColor: '#fff',
          padding: 5,
          paddingTop: 15,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
        }}>
        <Text style={[styles.text, styles.loading, {opacity: loading ? 1 : 0}]}>
          You are entering the virtual waiting room
        </Text>
        {loading ? (
          <Image
            source={require('../../../assets/icons/more.png')}
            style={styles.smallIcons}
          />
        ) : (
          <TouchableOpacity onPress={() => setLoading(true)}>
            <View style={[styles.button, {backgroundColor: '#F7C033'}]}>
              <Text style={[styles.text, {color: 'white'}]}>
                Enter Waiting Room
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <Text style={styles.emergency}>
          If this is an emergency please call 911
        </Text>
      </Container>
    </View>
  );
};

export default WaitingRoomEntry;

const styles = StyleSheet.create({
  smallIcons: {
    height: 50,
    width: 50,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 22,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 22,
    paddingHorizontal: 30,
    marginHorizontal: 10,
  },
  emergency: {
    width: '40%',
    textAlign: 'center',
    position: 'absolute',
    top: '70%',
  },
  loading: {
    position: 'absolute',
    width: '50%',
    textAlign: 'center',
    top: '25%',
  },
});
