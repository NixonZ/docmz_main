import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

export default class InChatScreen extends React.Component {
  state = {
    messages: [],
  };

  //variables to be passed for chat
  chatId = 'test';
  recieverEmail = 'a@a.com';
  recieverName = 'Dr. Z';

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello Patient',
          createdAt: new Date(),
          user: {
            _id: 2,
          },
        },
      ],
    });
    global.socket.on('recieveMessage', this.handleRecievedMessage);
  }

  componentWillUnmount() {
    global.socket.off('recieveMessage', this.handleRecievedMessage);
  }

  onSend(messages = []) {
    console.log('sending : ' + JSON.stringify(messages));
    global.socket.emit('sendMessage', {
      reciever: 'reciever-mail',
      message: messages[0].text,
      chatId: 'test',
      _id: messages[0]._id,
    });
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  handleRecievedMessage = data => {
    console.log('recieving : ' + JSON.stringify(data));
    if (data.chatId === this.chatId) {
      //chat belongs to the chatbox
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, {
          text: data.chat.message,
          createdAt: data.chat.time,
          _id: data.chat._id,
          user: {
            _id: data.chat.from,
          },
        }),
      }));
    } else {
      //chat doesnt belong here add the recieved messages to unread queue
    }
  };

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
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 'sender-mail',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
