import React from 'react';
import {View, StyleSheet,Text, ScrollView,TouchableOpacity,Image} from 'react-native';
import FancyHeader from '../../../components/organisms/FancyHeader/FancyHeader';
import Container from '../../../components/organisms/Container/Container';
import Feather from 'react-native-vector-icons/Feather';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';
import io from 'socket.io-client';
class VideoCallInterface extends React.Component{
  state = {
    localStream: null,
  };

  startLocalStream = async () => {
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find(
      device => device.kind === 'videoinput' && device.facing === facing,
    );
    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500,
          minHeight: 500,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
      },
    };
    const localStream = await mediaDevices.getUserMedia(constraints);

    this.setState({localStream});
  };

  async componentDidMount() {
    await this.startLocalStream();

    const {localStream} = this.state;
    const {room, linkId} = this.props;

    const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
    const localPC = new RTCPeerConnection(configuration);

    localPC.onicecandidate = e => {
      try {
        if (e.candidate) {
          console.log(`Ice Send-${linkId}`);

          room.emit(`OnIceCandidate-${linkId}`, e.candidate);
        }
      } catch (err) {
        console.error(`Error adding remotePC iceCandidate: ${err}`);
      }
    };

    room.on(`OnIceCandidate-${linkId}`, IceCandidate => {
      console.log(`Ice Received-${linkId}`, IceCandidate);
      localPC
        .addIceCandidate(new RTCIceCandidate(IceCandidate))
        .catch(e => console.log(e));
    });

    room.on(`answer-${linkId}`, answer => {
      console.log(`Answer Received-${linkId}`);

      localPC.setRemoteDescription(
        new RTCSessionDescription({type: 'answer', sdp: answer}),
      );
    });

    localPC.addStream(localStream);

    const offer = await localPC.createOffer({
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1,
    });
    console.log('Offer from localPC, setLocalDescription');
    await localPC.setLocalDescription(offer);
    room.emit(`offer-${linkId}`, offer.sdp);
  }
render(){
    const {localStream} = this.state;
    return(
      <View>
      <FancyHeader
      profileMode={true}
      headerText="Video Call"
        style={{
          Container: {height: '25%'},
          ChildContainer: {alignItems: 'center'},
        }}>
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
      <View style={{flex:1,flexDirection:"column"}}>
        <Text style={{textAlign:"center",position:"relative",fontStyle:"italic"}}>End-to-end encrypted</Text>
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
        <TouchableOpacity onPress={() => {}}>
          <View style={{
            position:'absolute',
            backgroundColor:'black',
            width:100,
            height:200,
            bottom:40,
            right:10,zindex:1000,
            borderRadius:30,
            }}>
            {localStream && (
              <RTCView
                // zOrder={100}
                objectFit="cover"
                style={{width: '100%', height: '100%'}}
                streamURL={localStream.toURL()}
              />
            )}

          </View>
        </TouchableOpacity>

    </Container>
    </View>
    );
  }
}

export default VideoCallInterface
