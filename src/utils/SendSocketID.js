import io from 'socket.io-client';
// import {HeadlessJsTaskError} from 'HeadlessJsTask';

// eslint-disable-next-line prettier/prettier
module.exports = async(taskData) => {
  let socket = io.connect('http://192.168.1.4:4000', {
    secure: true,
    transports: ['websocket'],
    rejectUnauthorized: false,
  });

  socket.on('hello', hello => {
    socket.emit('hello', 'hello');
  });

  socket.emit('sendID', {
    isDoctor: false,
  });

  // const condition = true;
  // if (!condition) {
  //   throw new HeadlessJsTaskError();
  // }
};
