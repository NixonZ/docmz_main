const ADD_MESSAGE = 'ADD_MESSAGE';
const READ_MESSAGE = 'READ_MESSAGE';
const ADD_MULTIPLE_MESSAGE = 'ADD_MULTIPLE_MESSAGE';

const addMessage = (chatId, data) => {
  return {
    type: ADD_MESSAGE,
    chatId,
    payload: data,
  };
};

const readMessage = chatId => {
  return {
    type: READ_MESSAGE,
    chatId,
  };
};

const addMultipleMessage = data => {
  return {
    type: ADD_MULTIPLE_MESSAGE,
    payload: data,
  };
};

export const _NewMessage = (chatId, message) => dispatch => {
  dispatch(addMessage(chatId, message));
};

export const _ReadMessage = chatId => dispatch => {
  dispatch(readMessage(chatId));
};

export const _NewMessageMultiple = data => dispatch => {
  //message transformation
  Object.keys(data).forEach(chatId => {
    data[chatId] = data[chatId].map(chat => {
      return {
        text: chat.message ?? '',
        createdAt: chat.time,
        _id: chat._id,
        user: {
          _id: chat.from,
        },
        image: chat.image ?? '',
      };
    });
  });
  dispatch(addMultipleMessage(data));
};
