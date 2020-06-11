const THEME_CHANGING = 'THEME_CHANGING';
const SET_THEME = 'SET_THEME';

export const changingTheme = () => {
  return {
    type: THEME_CHANGING,
  };
};
export const setTheme = theme => {
  return {
    type: SET_THEME,
    payload: theme,
  };
};
