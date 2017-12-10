/*
 * action 类型
 */
import {post, get} from '../util/request';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';

export const GET_COMMISSION_LIST = 'GET_COMMISSION_LIST';
export const CREATE_COMMISSION = 'CREATE_COMMISSION';
export const UPDATE_COMMISSION = 'UPDATE_COMMISSION';
export const DELETE_COMMISSION = 'DELETE_COMMISSION';

/*
 * action 创建函数
 */

function retrievedCommissionList(commissions) {
    return {type: GET_COMMISSION_LIST, commissions}
}

export function getCommissionList(id) {
    return dispatch => {
        post(url.getCommissionList, {id: id})
            .then((res) => {
                dispatch(retrievedCommissionList(res.responseBody.commissions));
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

function createdCommission(commission) {
    return {type: CREATE_COMMISSION, commission}
}

export function createCommission(commission, callback) {
    return dispatch => {
        StaticLoad.show("createCommission");
        post(url.createCommission, commission)
            .then((res) => {
                StaticLoad.remove("createCommission");
                dispatch(createdCommission(commission));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createCommission");
                StaticDialog.show("createCommission-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function rtrvCommissionDetail(staffId, callback) {
    return dispatch => {
        StaticLoad.show("rtrvCommissionDetail");
        get(url.rtrvCommissionDetail, {
            staffId: staffId
        })
            .then((res) => {
                StaticLoad.remove("rtrvCommissionDetail");
                callback(res);
            })
            .catch((error) => {
                StaticLoad.remove("rtrvCommissionDetail");
                StaticDialog.show("rtrvCommissionDetail-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function updatedCommission(commission) {
    return {type: UPDATE_COMMISSION, commission}
}

export function updateCommission(commission, callback) {
    return dispatch => {
        StaticLoad.show("updateCommission");
        post(url.updateCommission, commission)
            .then((res) => {
                StaticLoad.remove("updateCommission");
                dispatch(updatedCommission(commission));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateCommission");
                StaticDialog.show("updateCommission-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function deletedCommission(commission) {
    return {type: DELETE_COMMISSION, commission}
}

export function deleteCommission(commission) {
    return dispatch => {
        StaticLoad.show("deleteCommission");
        get(url.deleteCommission, {
            staffId: commission.staffId
        })
            .then(() => {
                StaticLoad.remove("deleteCommission");
                dispatch(deletedCommission(commission));
            })
            .catch((error) => {
                StaticLoad.remove("deleteCommission");
                StaticDialog.show("deleteCommission-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}