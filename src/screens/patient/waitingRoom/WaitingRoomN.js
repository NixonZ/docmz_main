import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import FancyHeaderLite from '../../../components/organisms/FancyHeaderLite/FancyHeaderLite';
import Container from '../../../components/organisms/Container/Container';
import {Image} from 'react-native-animatable';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';

const patientQueue = [
  {
    profileImg: require('../../../assets/jpg/person1.jpg'),
    currentUser: false,
    key: 1,
  },
  {
    profileImg: require('../../../assets/jpg/person1.jpg'),
    currentUser: false,
    key: 2,
  },
  {
    profileImg: require('../../../assets/jpg/person1.jpg'),
    currentUser: false,
    key: 3,
  },
  {
    profileImg: require('../../../assets/jpg/person1.jpg'),
    currentUser: true,
    key: 4,
  },
  {
    profileImg: require('../../../assets/jpg/person1.jpg'),
    currentUser: false,
    key: 5,
  },
  {
    profileImg: require('../../../assets/jpg/person1.jpg'),
    currentUser: false,
    key: 6,
  },
];

class WaitingRoomN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 0,
      timerActive: true,
      formFilled: false,
    };
  }

  componentDidMount() {
    if (this.state.timeLeft > 0)
      this.timer = setInterval(this.updateTimer, 1000);
    else if (this.state.timerActive) this.setState({timerActive: false});
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate() {
    if (this.state.timeLeft === 0) {
      clearInterval(this.timer);
      this.setState({timerActive: false, timeLeft: -1});
    }
  }

  updateTimer = () => {
    this.setState(prevState => ({timeLeft: prevState.timeLeft - 1}));
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FancyHeaderLite
          navigation={this.props.navigation}
          onLeftButtonPress={() => navigation.goBack(null)}
          headerText={'Waiting Room'}
          style={{
            Section: {overflow: 'hidden', height: '20%', marginBottom: 0},
          }}
        />
        <Container
          style={{
            height: '75%',
            transform: [{translateY: -30}],
            zIndex: 999,
            backgroundColor: '#fff',
            // padding: 5,
            paddingTop: 15,
          }}>
          <View style={styles.topBar}>
            <Text style={styles.text}>Blogs</Text>
            <Text style={styles.text}>Caregiver</Text>
            <Text style={styles.text}>Help</Text>
          </View>

          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={patientQueue}
              style={styles.queue}
              renderItem={({item}) => {
                return (
                  <View style={styles.queueItem}>
                    <Text style={styles.text}>{item.key}</Text>

                    <View
                      style={[
                        styles.profileImg,
                        item.currentUser ? {borderWidth: 3} : null,
                      ]}>
                      <Image
                        source={item.profileImg}
                        style={[styles.smallIcons, styles.round]}
                      />
                    </View>
                  </View>
                );
              }}
            />
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
          </View>
          <View style={styles.timerContainer}>
            <Text style={[styles.text, {textAlign: 'center'}]}>
              Approximate time left for your consultation
            </Text>
            <View style={styles.timer}>
              {this.state.timerActive ? (
                <Text style={styles.text}>
                  {this.renderTime(this.state.timeLeft)}
                </Text>
              ) : (
                <TouchableOpacity>
                  <Text
                    style={[styles.text, {textDecorationLine: 'underline'}]}>
                    Enter
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {this.state.formFilled ? (
            <View style={styles.nextAppointment}>
              <Text>Your next appt begins in 35 mins</Text>
              <Text>Your subsequent appt begins in 35 + 15 mins</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.fillForm}
              onPress={() => this.setState({formFilled: true})}>
              <Text style={[styles.text, styles.link]}>Fill Form</Text>
            </TouchableOpacity>
          )}
        </Container>
      </View>
    );
  }

  renderTime = timeLeft => {
    const timeInt = {
      seconds: timeLeft % 60,
      minutes: parseInt(timeLeft / 60, 10) % 60,
      //   hours: parseInt(timeLeft / (60 * 60), 10) % 24,
    };

    const timeStrList = Object.keys(timeInt).map(label => {
      if (timeInt[label] === 0) return '00';
      else if (timeInt[label] < 10) return '0' + timeInt[label];
      else return timeInt[label];
    });

    return timeStrList.reverse().join(':');
  };
}

export default WaitingRoomN;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  profileImg: {
    borderColor: '#6230CC',
    borderStyle: 'dashed',
    padding: 1,
    borderRadius: 30,
    marginHorizontal: 10,
    marginTop: 3,
  },
  round: {
    borderRadius: 25,
    marginHorizontal: 0,
  },
  body: {
    margin: 30,
  },
  smallIcons: {
    height: 50,
    width: 50,
    marginHorizontal: 10,
  },
  queueItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  queue: {
    marginHorizontal: 40,
    marginVertical: 20,
  },
  text: {
    fontSize: 22,
  },
  link: {
    color: '#6230CC',
    textDecorationLine: 'underline',
    textDecorationColor: '#6230CC',
    alignSelf: 'center',
    marginTop: 10,
  },
  timerContainer: {
    marginHorizontal: 30,
    alignItems: 'center',
  },
  timer: {
    backgroundColor: '#F7C033',
    borderRadius: 50,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  nextAppointment: {
    // borderWidth: 1,
    padding: 20,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    elevation: 10,
    backgroundColor: 'white',
    bottom: 0,
    width: '100%',
  },
});
