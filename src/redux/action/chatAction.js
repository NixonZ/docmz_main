const ADD_MESSAGE = 'ADD_MESSAGE';
const READ_MESSAGE = 'READ_MESSAGE';

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

export const _NewMessage = (chatId, message) => dispatch => {
  dispatch(addMessage(chatId, message));
};

export const _ReadMessage = chatId => dispatch => {
  dispatch(readMessage(chatId));
};
