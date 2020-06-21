import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import moment from 'moment';
import {AppState} from 'react-native';

export default function RealTimeOnline() {
  const [appState, SetappState] = useState(AppState.currentState);
  const [lastSeen, SetlastSeen] = useState(
    moment().format('MMMM Do YYYY, h:mm:ss a'),
  );
  const {data} = useSelector(state => state.AuthReducer);

  useEffect(() => {
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
        global.socket.emit('RemoveUser', data.email);
      }

      //User's last online activity
      console.log('Last Online Activity - ' + lastSeenDate);

      SetappState(nextAppState);
    }

    AppState.addEventListener('change', _handleAppStateChange);

    return function cleanup() {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  });

  return null;
}
