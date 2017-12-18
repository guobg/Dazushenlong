import {combineReducers} from 'redux';
import userInfo from './user_reducer';
import employee from './employee_reducer';
import organization from './organization_reducer';
import member from './member_reducer';
import memberCard from './memberCard_reducer';
import schedule from './schedule_reducer';
import position from './position_reducer';
import serviceItem from './serviceItem_reducer';
import commission from './commission_reducer';
import materiel from './materiel_reducer';
import materielUnit from './materielUnit_reducer';

const mindvationApp = combineReducers({
    userInfo,
    employee,
    organization,
    member,
    memberCard,
    schedule,
    position,
    serviceItem,
    commission,
    materiel,
    materielUnit
});

export default mindvationApp;