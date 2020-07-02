import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import moment from 'moment';
import {AppState} from 'react-native';

import {_NewMessage} from '../redux/action/chatAction';

var dispatch = null;

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
    }

    //User's last online activity
    console.log('Last Online Activity - ' + lastSeenDate);
  }

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    _handleAppStateChange(AppState.currentState);
    _setMessageListener();

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
  message = {
    text: data.chat.message,
    createdAt: data.chat.time,
    _id: data.chat._id,
    user: {
      _id: data.chat.from,
    },
  };
  dispatch(_NewMessage(data.chatId, message));
};
