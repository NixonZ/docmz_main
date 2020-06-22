import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

export default class InChatScreen extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
          },
        },
      ],
    });
    global.socket.on('recieveMessage', data => {
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
    });
  }

  onSend(messages = []) {
    // console.log(JSON.stringify(messages));
    global.socket.emit('sendMessage', {
      reciever: 'reciever-mail',
      sender: messages[0].user._id,
      message: messages[0].text,
      chatId: 'test',
    });
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    const {params} = this.props.navigation.state;
    // const username = params.username;
    const username = 'name';
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
              color: '#fff',
              marginTop: 30,
              fontFamily: 'monospace',
            }}>
            {username}
          </Text>
        </View>

        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
