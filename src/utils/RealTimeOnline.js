import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import moment from 'moment';
import {AppState, AsyncStorage} from 'react-native';

import {_NewMessage, _NewMessageMultiple} from '../redux/action/chatAction';

import axios from 'axios';
import {Host} from '../utils/connection';

var dispatch = null;
const chatIds = ['test3']; //get this list from the user store

export default function RealTimeOnline() {
  const [lastSeen, SetlastSeen] = useState(
    moment().format('MMMM Do YYYY, h:mm:ss a'),
  );
  const {data} = useSelector(state => state.AuthReducer);
  dispatch = useDispatch();

  function _handleAppStateChange(nextAppState) {
    const _captureDate = () => {
      SetlastSeen(moment().format('MMMM Do YYYY, h:mm:ss a'));
    };
    //Formatting - for displaying the activity to other users
    var lastSeenDate = moment(lastSeen, 'MMMM Do YYYY, h:mm:ss a').fromNow();

    //Current Online or Offline status will be displayed here
    if (nextAppState == 'active') {
      console.log('App has come to the foreground!');
      console.log('Activity Status --> Online');
      global.socket.emit('sendID', {
        email_id: data.email,
        time: moment().format('MMMM Do YYYY, h:mm:ss a'),
      });
    } else {
      console.log('App has come to the background/inactive');
      console.log('Activity Status --> Offline');
      _captureDate(); //If user is offline, function will capture the date/time
      global.socket.emit('RemoveUser');
      console.log('storing timestamp: ' + moment());
      AsyncStorage.setItem('timestamp', JSON.stringify(moment()));
    }

    //User's last online activity
    console.log('Last Online Activity - ' + lastSeenDate);
  }

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    _handleAppStateChange(AppState.currentState);
    _setMessageListener();
    _fetchNewMessages();

    return function cleanup() {
      AppState.removeEventListener('change', _handleAppStateChange);
      _removeMessageListener();
    };
  }, []);

  return null;
}

const _setMessageListener = () => {
  global.socket.on('recieveMessage', _handleMessageRecieve);
};

const _removeMessageListener = () => {
  global.socket.off('recieveMessage', _handleMessageRecieve);
};

const _handleMessageRecieve = data => {
  console.log('message recieved');
  const message = {
    text: data.chat.message ?? '',
    createdAt: data.chat.time,
    _id: data.chat._id,
    user: {
      _id: data.chat.from,
    },
    image: data.chat.image ?? '',
  };
  dispatch(_NewMessage(data.chatId, message));
};

_fetchNewMessages = async () => {
  try {
    const rawTimestamp = await AsyncStorage.getItem('timestamp');
    const timestamp = moment(JSON.parse(rawTimestamp ?? 0));
    console.log('timestamp : ' + timestamp);

    const res = await axios.post(`${Host}/chat/getChat`, {
      chatIds,
      timestamp,
    });
    console.log(res.data);
    dispatch(_NewMessageMultiple(res.data));
  } catch (err) {
    console.log('Fetch error : ' + err);
  }
};
