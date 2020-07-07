import {createStackNavigator} from 'react-navigation';

// import Login from '../screens/authentication/login/Login';
import ChatScreen from '../screens/chat/ChatScreen';
import InChatScreen from '../screens/chat/InChatScreen';

const ChatNavigation = createStackNavigator(
  {
    ChatScreen,
    InChatScreen,
  },
  {
    initialRouteName: 'ChatScreen',
    headerMode: 'none',
  },
);

export default ChatNavigation;
