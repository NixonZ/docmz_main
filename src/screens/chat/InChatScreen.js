import React from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {connect, useDispatch} from 'react-redux';
import {_ReadMessage} from '../../redux/action/chatAction';

class InChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  //variables to be passed for chat
  chatId = 'test';
  recieverEmail = 'a@a.com';
  recieverName = 'Dr. Z';

  componentDidMount() {
    AsyncStorage.getItem(this.chatId)
      .then(data => {
        // console.log(data);
        if (data != null) this.setState({messages: JSON.parse(data)});
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    AsyncStorage.setItem(
      this.chatId,
      JSON.stringify([...this.state.messages, ...this.props.chatData]),
    );

    this.props.dispatch(_ReadMessage(this.chatId));
  }

  onSend(messages = []) {
    console.log('sending : ' + JSON.stringify(messages));
    global.socket.emit('sendMessage', {
      reciever: 'reciever-mail',
      message: messages[0].text,
      chatId: 'test',
      _id: messages[0]._id,
      time: messages[0].createdAt,
    });
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
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
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 'sender-mail',
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  ownProps.chatId = 'test'; //testing
  return {
    chatData: state.chatReducer[ownProps.chatId]
      ? [...state.chatReducer[ownProps.chatId]]
      : [],
  };
}

export default connect(mapStateToProps)(InChatScreen);
