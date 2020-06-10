import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Host} from '../../utils/connection';

import {resetDataStore} from './dataStore';
import {resetDoctor} from './doctoreAction';
import {resetQuestion} from './questionAction';

export const addUserToRedux = data => {
  return {
    type: 'AUTHENTICATED',
    data: data,
  };
};

export const addUserFullData = data => {
  return {
    type: 'FULLDATA',
    data: data,
  };
};

const SAVE_USER = 'SAVE_USER';
const ERROR = 'HAVEING_ERROR';
const LOADING = 'LOADING';
const REMOVE_USER = 'REMOVE_USER';
const SAVE_APPOINTMENT = 'SAVE_APPOINTMENT';
const REMOVE_APPOINTMENT = 'REMOVE_APPOINTMENT';
const STOP_LOADING = 'STOP_LOADING';

const saveNewUser = (data, type) => {
  return {
    type: SAVE_USER,
    userData: data,
    userType: type.localeCompare('doctor') === 0,
  };
};
const haveingError = err => {
  return {
    type: ERROR,
    error: err,
  };
};

const startLoading = () => {
  return {
    type: LOADING,
  };
};

const stoptLoading = () => {
  return {
    type: STOP_LOADING,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const setAppointment = appointment => {
  return {
    type: SAVE_APPOINTMENT,
    payload: appointment,
  };
};

const removeAppointment = id => {
  return {
    type: REMOVE_APPOINTMENT,
    payload: id,
  };
};

export const resetStore = () => {
  return async dispatch => {
    await dispatch(removeUser());
    // await dispatch(resetDoctor())
    await dispatch(resetDataStore());
    await dispatch(resetQuestion());
  };
};

export const LoginPatient = (data, success, faild) => {
  return dispatch => {
    // setup loading screen
    dispatch(startLoading());
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

    // setting header
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };

    console.log(data);

    axios
      .post(`${Host}/patient/authenticate`, data, config)
      .then(result => {
        console.log(result.data);
        if (result.data.status) {
          const data = result.data.user;

          const _data = {
            id: data._id,
            email: data.email,
            phone: data.phone,
            name: data.firstName === undefined ? 'No name' : data.firstName,
            socketid: global.socket.id,
          };
          // send socket id to backend
          dispatch(saveNewUser(_data, 'patient'));
          success({
            status: true,
            message: 'patient add successfully.',
          });
        } else {
          faild({
            status: false,
            message: result.data.error,
          });
        }
      })
      .catch(err => {
        dispatch(haveingError(err));
      });
  };
};

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export const LoginDoctor = (data, success, faild) => {
  return dispatch => {
    dispatch(startLoading());
    // setting header
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    global.socket.emit('sendID', {
      email_id: data.email,
    });

    axios
      .post(`${Host}/doctors/authenticate`, data, config)
      .then(result => {
        if (result.data.status) {
          const data = result.data.user;

          const _data = {
            id: data._id,
            name: data.basic.name,
            email: data.email,
            phone: data.phone,
          };

          dispatch(saveNewUser(_data, 'doctor'));
          success({
            status: true,
            message: 'Doctor Login successfully.',
          });
        } else {
          faild({
            status: false,
            message: result.data.error,
          });
        }
      })
      .catch(err => {
        // console.log('****************** in err *****************', err)
        faild({
          // message: 'Incorrect Email and/or password'
          message: err,
        });
        dispatch(haveingError(err));
      });
  };
};

export const signupDoctor = (data, successCallback, errorCallback) => {
  return dispatch => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    const _data = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      registration_number: data.registration_id,
      specialty: data.specialty,
      city: data.city,
      state: data.state,
      country: data.country,
      basic: JSON.stringify({}),
      appointmentsString: data.appointmentsString,
      firstName: data.firstName,
      lastName: data.lastName,
      referralId: data.referralId,
    };

    console.log(_data);

    dispatch(startLoading());
    axios
      .post(`${Host}/doctors/register`, _data, config)
      .then(result => {
        // console.log(result);
        if (result.data.status) {
          const __data = {
            mode: 'doctor',
            email: result.data.data.email,
            name: result.data.data.name,
            phone: result.data.data.phone,
            id: result.data.data._id,
          };
          //   _save(__data);

          AsyncStorage.setItem('userData', JSON.stringify(__data))
            .then(() => {
              dispatch(saveNewUser(__data, 'doctor'));
              successCallback();
            })
            .catch(err => {
              dispatch(haveingError(err));
              errorCallback(err);
            });
        }
        console.log(result.data.status);
      })
      .catch(err => {
        dispatch(haveingError(err));
        errorCallback(err);
      });
  };
};

export const signupPatient = (data, successCallback, errorCallback) => {
  return dispatch => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    dispatch(startLoading());
    axios
      .post(`${Host}/patient/register`, data, config)
      .then(result => {
        console.log('result');
        if (result.data.status) {
          dispatch(stoptLoading());
          successCallback();
          console.log(result.data.status);
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(haveingError(err.message));
        errorCallback(err.message);
      });
  };
};

export const GetAppointmentData = id => {
  return dispatch => {
    dispatch(startLoading());
    console.log('works...');
    axios
      .get(`${Host}/patient/getinfo/${id}`)
      .then(result => {
        if (result.status) {
          console.log(result.data.data.appointments);
          dispatch(setAppointment(result.data.data.appointments));
        }
      })
      .catch(err => {
        dispatch(haveingError(err));
      });
  };
};

export const RemoveAppointmentData = id => {
  return async dispatch => {
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const _data = {
      byPatient: 'true',
      byDoctor: 'false',
      reason: 'Have some important work',
      id: id,
    };

    await axios
      .post(`${Host}/appointment/cancel`, _data, config)
      .then(result => {
        if (result.status) {
          console.log('Successfully cancel your appointment.');
          dispatch(removeAppointment(id));
        }
      })
      .catch(err => {
        dispatch(haveingError(err));
      });
  };
};
