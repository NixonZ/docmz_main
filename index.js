/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Store from './src/redux/config/store';
// import App from './App';
import AtomExample from './example/atomExample';
 
// AppRegistry.registerComponent(appName, () => AtomExample);

AppRegistry.registerHeadlessTask('SendSocketID', () =>
    require('./src/utils/SendSocketID'),
);

AppRegistry.registerComponent(docmz, () => Store);

const changeStatus = (socket, namespace) => ({ username, status, room }) => {
    console.log(`user ${username} wants to change his status to ${status}`);

    Vido_chat.getUser(room, socket.id)
        .then(user => Video_chat.setUser(room, socket.id, { ...user, status }))
        .then(() => Video_chat.getUsers(room))
        .then(users => {
            if (users === null) return
            // Notify all the users in the same room
            namespace.in(room).emit('newUser', { users, username });
        })
}
module.exports = {
    changeStatus,
}
