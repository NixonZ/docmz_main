import {combineReducers} from 'redux';

import AuthReducer from '../reducer/auth';
import DataStoreReducer from '../reducer/dataStore';
import ScheduleReducer from './schedule';
import DoctorReducer from './doctorReducer';
import QuestionReducer from './questionReducer';
import DoctorScheduleReducer from './doctor/scheduleReducer';
import MyDoctorReducer from './doctor/myDoctorReducer';
import questionnaireReducer from './doctor/questionnaireReducer';
import PatientAccountReducer from './patientAccountReducer';
import themeReducer from './themeReducer';
const allReducer = combineReducers({
  AuthReducer,
  DataStoreReducer,
  ScheduleReducer,
  DoctorReducer,
  QuestionReducer,
  DoctorScheduleReducer,
  MyDoctorReducer,
  PatientAccountReducer,
  questionnaireReducer,
  themeReducer,
});

export default allReducer;
