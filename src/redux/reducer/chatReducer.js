const initialState = {};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      newState = {...state};
      if (newState[action.chatId] === undefined) newState[action.chatId] = [];
      newState[action.chatId].push(action.payload);
      console.log('message added');
      return newState;

    case 'READ_MESSAGE':
      newState = {...state};
      newState[action.chatId] = [];
      return newState;

    default:
      return state;
  }
};

export default chatReducer;
