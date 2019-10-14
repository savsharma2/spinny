import { LOGIN_USER, LOGIN_USER_SUCCESS } from './action';
export default (
  state = { isLoading: false, isLoaded: false, data: {} },
  action
) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLoading: true,
        isLoaded: false
      };
    case LOGIN_USER_SUCCESS:
      if (action.payload.length) {
        debugger;
        setCookie('user_id', action.payload[0].id, 1);
        return {
          ...state,
          isLoading: false,
          isLoaded: true,
          data: action.payload[0]
        };
      }
    default:
      return state;
  }
};

export const getCurrentUser = state => getCookie('user_id');

const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

const getCookie = cname => {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
