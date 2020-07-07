import React from 'react';
import {View, Text, StyleSheet, AsyncStorage, Image} from 'react-native';
import {connect} from 'react-redux';
import {_ReadMessage} from '../../redux/action/chatAction';
import {
  GiftedChat,
  InputToolbar,
  Actions,
  Composer,
  Send,
} from 'react-native-gifted-chat';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import AudioRecord from 'react-native-audio-record';
import {PERMISSIONS, request, check} from 'react-native-permissions';
import TrackPlayer from 'react-native-track-player';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import {Host} from '../../utils/connection';
import {uniqueId} from 'lodash';

class InChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      hasCameraPermission: null,
      modalVisible: true,
    };
    console.log('constructor loaded');
    //variables to be passed for chat
    this.chatId = props.navigation.state.params.recieverData.chatId ?? 'test';
    this.recieverEmail =
      props.navigation.state.params.recieverData.email ?? 'a@a.com';
    this.recieverName =
      props.navigation.state.params.recieverData.name ?? 'Dr. Z';
    this.senderEmail = 'nomail';
  }

  async componentDidMount() {
    request(
      PERMISSIONS.ANDROID.INTERNET &&
        PERMISSIONS.ANDROID.CAMERA &&
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE &&
        PERMISSIONS.ANDROID.RECORD_AUDIO &&
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ).then(result => {
      console.log(result);
      this.setState({hasCameraPermission: status === 'granted'});
    });

    AsyncStorage.getItem(this.chatId)
      .then(data => {
        // console.log(data);
        if (data != null) this.setState({messages: JSON.parse(data)});
      })
      .catch(err => console.log(err));

    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });
  }

  componentWillUnmount() {
    AsyncStorage.setItem(
      this.chatId,
      JSON.stringify([...this.state.messages, ...this.props.chatData]),
    );

    this.props.dispatch(_ReadMessage(this.chatId));
  }

  render() {
    console.log(
      'no of messages' +
        (this.state.messages.length + this.props.chatData.length),
    );
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            padding: 15,
            alignItems: 'center',
            height: 80,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 18,
              marginTop: 30,
              fontFamily: 'monospace',
            }}>
            {this.recieverName}
          </Text>
        </View>

        <GiftedChat
          messages={GiftedChat.append(
            this.state.messages,
            this.props.chatData,
          ).sort((a, b) => {
            const time1 = new Date(a.createdAt);
            const time2 = new Date(b.createdAt);
            return time2 - time1;
          })}
          onSend={this.onSend}
          user={{
            _id: this.senderEmail,
          }}
          renderSend={this.renderSend}
          renderComposer={this.renderComposer}
          renderActions={this.renderActions}
          renderInputToolbar={this.renderInputToolbar}
          renderMessageAudio={this.renderMessageAudio}
          onLongPress={(context, message) => this.onLongPress(context, message)}
        />
      </View>
    );
  }

  onSend = (messages = []) => {
    console.log('sending : ' + JSON.stringify(messages));
    global.socket.emit('sendMessage', {
      reciever: this.recieverEmail,
      message: messages[0].text ?? '',
      chatId: this.chatId,
      _id: messages[0]._id,
      time: messages[0].createdAt,
      image: messages[0].image ?? '',
    });
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  _uploadMedia = async (response, type) => {
    console.log('image selected:  ' + JSON.stringify(response));

    try {
      var formData = new FormData();
      formData.append('chatId', this.chatId);
      formData.append('files', {
        uri: response.uri,
        type: response.type,
        name: type === 'image' ? response.fileName : response.name,
      });
      const uploadRes = await axios.post(`${Host}/chat/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      var path = uploadRes.data[0].path.split('/');
      path.shift();
      path = path.join('/');
      // console.log(path);

      this.onSend([
        {
          _id: uniqueId(),
          createdAt: Date.now(),
          image: type === 'image' ? Host + '/' + path : '',
          text: type === 'document' ? Host + '/' + path : '',
          user: {
            _id: this.senderEmail,
          },
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  _getPhotoLibrary = () => {
    console.log('call');
    try {
      const options = {
        title: 'Upload Photo',
        noData: true,
        mediaType: 'photo',
      };
      ImagePicker.launchImageLibrary(options, res =>
        this._uploadMedia(res, 'image'),
      );
    } catch (e) {
      console.log(e);
    }
  };

  _getCamera = () => {
    try {
      const options = {
        title: 'Upload Photo',
        noData: true,
        mediaType: 'photo',
      };
      ImagePicker.launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          this._uploadMedia(response, 'image');
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  _getDocument = async () => {
    try {
      let res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      if (!res.cancelled) {
        try {
          this._uploadMedia(res, 'document');
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  _getAudio = async () => {
    const recording = new Audio.Recording();
    try {
      console.log('a');
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      await recording.startAsync();
      setTimeout(() => {
        try {
          recording.stopAndUnloadAsync();
          console.log(recording.getURI());
        } catch (e) {
          console.log('err', e);
        }
      }, 5000);
      console.log('b');
    } catch (error) {
      console.log(error);
    }
  };

  _getAudioRecording = async () => {
    try {
      const options = {
        sampleRate: 16000, // default 44100
        channels: 1, // 1 or 2, default 1
        bitsPerSample: 16, // 8 or 16, default 16
        audioSource: 6, // android only (see below)
        wavFile: 'test.wav', // default 'audio.wav'
      };

      AudioRecord.init(options);

      AudioRecord.start();
      setTimeout(async () => {
        console.log('here');
        try {
          const audioFile = await AudioRecord.stop();
          console.log('adio', audioFile);

          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, {
              _id: 2,
              text: '',
              createdAt: new Date(),
              user: {
                _id: this.senderEmail,
              },
              image: '',
              audio: audioFile,
            }),
          }));
        } catch (e) {
          console.log(e);
        }
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  _playAudio = async () => {
    try {
      TrackPlayer.setupPlayer().then(async () => {
        // Adds a track to the queue
        await TrackPlayer.add({
          id: 'trackId',
          url: this.state.adio,
          title: 'Track Title',
          artist: 'Track Artist',
        });

        // Starts playing it
        TrackPlayer.play();
      });
    } catch (error) {
      console.log(error);
    }
  };

  onLongPress(context, message) {
    console.log(message);
    const options = ['Copy', 'Reply', 'Forward', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(message.text);
            break;
          case 1:
            //code to reply
            break;
          case 2:
            console.log('hi');

            this.forwardMessage(message);
            break;
        }
      },
    );
  }

  renderInputToolbar = props => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: '#FFF',
        paddingTop: 6,
      }}
      primaryStyle={{alignItems: 'center'}}
    />
  );

  renderMessageAudio = props => (
    <View style={{padding: 20}}>
      <Text style={{margin: 4}}>Voice</Text>
      <Button title="play" onPress={this._playAudio} />
    </View>
  );

  renderActions = props => (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => (
        <Image
          style={{width: 32, height: 32}}
          source={require('../../assets/icons/attach.png')}
        />
      )}
      options={{
        'Choose From Gallery': () => {
          this._getPhotoLibrary();
        },
        Camera: () => {
          this._getCamera();
        },
        Document: () => {
          this._getDocument();
        },
        Voice: () => {
          this._getAudioRecording();
        },
      }}
      optionTintColor="#222B45"
    />
  );

  renderComposer = props => (
    <Composer
      {...props}
      textInputStyle={{
        color: '#222B45',
        backgroundColor: '#EDF1F7',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#E4E9F2',
        paddingTop: 8.5,
        paddingHorizontal: 12,
        marginLeft: 0,
      }}
    />
  );

  renderSend = props => (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
      }}>
      <Image
        style={{width: 32, height: 32}}
        source={require('../../assets/icons/send.png')}
      />
    </Send>
  );
}

function mapStateToProps(state, ownProps) {
  const chatId =
    ownProps.navigation?.state?.params?.recieverData?.chatId ?? 'test';

  console.log(state.chatReducer[chatId]);
  // console.log(chatId);
  return {
    chatData: state.chatReducer[chatId] ? [...state.chatReducer[chatId]] : [],
  };
}

export default connect(mapStateToProps)(InChatScreen);
