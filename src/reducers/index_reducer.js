import {combineReducers} from 'redux';
import userInfo from './logon_reducer';
import employee from './employee_reducer';
import department from './department_reducer';
import member from './member_reducer';

const mindvationApp = combineReducers({
    userInfo,
    employee,
    department,
    member
});

export default mindvationApp;