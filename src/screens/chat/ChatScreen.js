import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

class ChatScreen extends React.Component {
  state = {
    chats: [
      {name: 'Friend #1', group: false, email: 'a@a.com', chatId: 'test2'},
      {name: 'Friend #2', group: false, email: 'a@a.com', chatId: 'a'},
      {name: 'Friend #3', group: false, email: 'a@a.com', chatId: 'b'},
      {name: 'Friend #4', group: false, email: 'a@a.com', chatId: 'c'},
      {name: 'Friend #5', group: false, email: 'a@a.com', chatId: 'd'},
      {name: 'Friend #6', group: false, email: 'a@a.com', chatId: 'e'},
      {name: 'Friend #7', group: false, email: 'a@a.com', chatId: 'f'},
      {name: 'Friend #8', group: false, email: 'a@a.com', chatId: 'g'},
    ],
  };

  render() {
    return (
      <View style={{backgroundColor: '#FFF'}}>
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
            Chat List
          </Text>
        </View>

        <FlatList
          data={this.state.chats}
          nestedScrollEnabled
          keyExtractor={item => item.chatId}
          renderItem={({item}) => {
            return (
              <View style={{margin: 0, height: 70}}>
                {
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('InChatScreen', {
                        recieverData: item,
                      })
                    }>
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 4,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'monospace',
                          alignSelf: 'center',
                          marginLeft: 20,
                          color: '#444484',
                          fontSize: 16,
                        }}>
                        {item.name}
                      </Text>
                      <Text>{this.props.unreadMessages[item.chatId] ?? 0}</Text>
                    </View>
                  </TouchableOpacity>
                }
              </View>
            );
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  var unreadMessages = {...state.chatReducer};
  Object.keys(unreadMessages).forEach(
    chatId => (unreadMessages[chatId] = unreadMessages[chatId]?.length ?? 0),
  );
  return {
    unreadMessages,
  };
}

export default connect(mapStateToProps)(ChatScreen);

const styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'red',
    position: 'absolute',
    left: -120,
    top: -20,
  },
});
