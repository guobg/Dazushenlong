import {combineReducers} from 'redux';
import userInfo from './logon_reducer';
import employee from './employee_reducer';
import department from './department_reducer';

const mindvationApp = combineReducers({
    userInfo,
    employee,
    department
});

export default mindvationApp;