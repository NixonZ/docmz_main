import React, {useState, useReducer, useRef} from 'react';
import {View, StyleSheet,Text, ScrollView,TouchableOpacity,Image} from 'react-native';
import FancyHeader from '../../../components/organisms/FancyHeader/FancyHeader';
import Container from '../../../components/organisms/Container/Container';
import Feather from 'react-native-vector-icons/Feather';
import NavigationActions from 'react-navigation/src/NavigationActions';
import {useDispatch, useSelector} from 'react-redux';
const VideoCall = ({navigation}) => {
  const {data} = navigation.state.params;
  const [showPopup, setShowPopup] = useState(false);
  console.log(data.basic.name);
    return(
      <View>
      <FancyHeader
      profileMode={true}
      headerText="Video Call"
        style={{
          Container: {height: '25%'},
        }}
        leftButtonClick={() => navigation.navigate('patientHomePage')}
        >
    </FancyHeader>

      <Container
        style={{
          height: '80%',
          transform: [{translateY: -50}],
          zIndex: 999,
        }}>
      <View>
        <Feather name="users" size={20} style={{left:50,top:40}}/>
        <Feather name="users" size={20} style={{left:350,top:20}}/>
      </View>
      <View style={{flex:1,flexDirection:"column",alignContent:"center"}}>
        <Text style={{textAlign:"center",position:"relative",fontStyle:"italic"}}>End-to-end encrypted</Text>
        <View
          style={{
            top:30,
            height: 80,
            width: 80,
            borderRadius: 150,
            backgroundColor: '#fff',
            overflow: 'hidden',
            alignSelf:"center",
          }}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={require('../../../assets/jpg/person3.jpg')}
          />
          </View>
          <Text style={{textAlign:"center",top:50,fontSize:15}}>Dr. {data.basic.name}</Text>
          <Text style={{textAlign:"center",top:50,fontSize:15}}>Calling</Text>
      </View>
      <View
        style={{
          bottom:30,
          height: 80,
          width: 80,
          borderRadius: 150,
          backgroundColor: '#fff',
          overflow: 'hidden',
          alignSelf:"center",
        }}>
        <Image
          style={{height: '100%', width: '100%'}}
          source={require('../../../assets/icons/v2.jpg')}
        />
        </View>
    </Container>
    </View>
    );
}


export default VideoCall;
