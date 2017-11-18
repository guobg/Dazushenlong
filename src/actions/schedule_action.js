/*
 * action 类型
 */
import {post, get} from '../util/request';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';

export const GET_SCHEDULE_LIST = 'GET_SCHEDULE_LIST';
export const CREATE_SCHEDULE = 'CREATE_SCHEDULE';
export const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE';
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE';

/*
 * action 创建函数
 */

function retrievedScheduleList(schedules) {
    return {type: GET_SCHEDULE_LIST, schedules}
}

export function getScheduleList(page, pageSize) {
    return dispatch => {
        post(url.getScheduleList, {
            page: page,
            pageSize: pageSize
        })
            .then((res) => {
                dispatch(retrievedScheduleList({
                    schedules: res.responseBody.schedules,
                    totalElements: res.responseBody.totalNumber
                }));
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

function createdSchedule(schedule) {
    return {type: CREATE_SCHEDULE, schedule}
}

export function createSchedule(schedule, callback) {
    return dispatch => {
        StaticLoad.show("createSchedule");
        post(url.createSchedule, schedule)
            .then((res) => {
                StaticLoad.remove("createSchedule");
                dispatch(createdSchedule(schedule));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createSchedule");
                StaticDialog.show("createSchedule-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function rtrvScheduleDetail(staffId, callback) {
    return dispatch => {
        StaticLoad.show("rtrvScheduleDetail");
        get(url.rtrvScheduleDetail, {
            staffId: staffId
        })
            .then((res) => {
                StaticLoad.remove("rtrvScheduleDetail");
                callback(res);
            })
            .catch((error) => {
                StaticLoad.remove("rtrvScheduleDetail");
                StaticDialog.show("rtrvScheduleDetail-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function updatedSchedule(schedule) {
    return {type: UPDATE_SCHEDULE, schedule}
}

export function updateSchedule(schedule, callback) {
    return dispatch => {
        StaticLoad.show("updateSchedule");
        post(url.updateSchedule, schedule)
            .then((res) => {
                StaticLoad.remove("updateSchedule");
                dispatch(updatedSchedule(schedule));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateSchedule");
                StaticDialog.show("updateSchedule-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function deletedSchedule(schedule) {
    return {type: DELETE_SCHEDULE, schedule}
}

export function deleteSchedule(schedule) {
    return dispatch => {
        StaticLoad.show("deleteSchedule");
        get(url.deleteSchedule, {
            staffId: schedule.staffId
        })
            .then(() => {
                StaticLoad.remove("deleteSchedule");
                dispatch(deletedSchedule(schedule));
            })
            .catch((error) => {
                StaticLoad.remove("deleteSchedule");
                StaticDialog.show("deleteSchedule-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}