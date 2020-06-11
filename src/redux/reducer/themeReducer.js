const initialState = {
  isThemeChanging: false,
  theme: 1,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'THEME_CHANGING':
      return {
        ...state,
        isThemeChanging: true,
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
        isThemeChanging: false,
      };
    default:
      return state;
  }
};

export default themeReducer;
