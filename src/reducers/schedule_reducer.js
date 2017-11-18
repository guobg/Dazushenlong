import {GET_SCHEDULE_LIST, CREATE_SCHEDULE, UPDATE_SCHEDULE, DELETE_SCHEDULE} from '../actions/schedule_action';

function schedule(state = {
    schedules: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case GET_SCHEDULE_LIST:
            return action.schedules;
        case CREATE_SCHEDULE:
            let temp = {...state};
            temp.schedules.push(action.schedule);
            return temp;
        case UPDATE_SCHEDULE:
            let temp2 = {...state};
            temp2.schedules.some((schedule) => {
                if (schedule.scheduleId === action.schedule.scheduleId) {
                    Object.assign(schedule, action.schedule);
                    return true;
                }
            });
            return Object.assign([], state, temp2);
        case DELETE_SCHEDULE:
            let temp3 = {...state};
            temp3.schedules.splice(temp3.schedules.indexOf(action.schedule), 1);
            temp3.totalElements = temp3.totalElements - 1;
            return temp3;
        default:
            return state
    }
}

export default schedule;