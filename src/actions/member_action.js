/*
 * action 类型
 */
import {post, get} from '../util/request';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';

export const GET_MEMBER_LIST = 'GET_MEMBER_LIST';
export const CREATE_MEMBER = 'CREATE_MEMBER';
export const UPDATE_MEMBER = 'UPDATE_MEMBER';
export const DELETE_MEMBER = 'DELETE_MEMBER';

/*
 * action 创建函数
 */

function retrievedMemberList(members) {
    return {type: GET_MEMBER_LIST, members}
}

export function getMemberList(page, pageSize) {
    return dispatch => {
        post(url.getMemberList, {
            page: page,
            pageSize: pageSize
        })
            .then((res) => {
                dispatch(retrievedMemberList({
                    members: res.responseBody.members,
                    totalElements: res.responseBody.totalNumber
                }));
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

function createdMember(member) {
    return {type: CREATE_MEMBER, member}
}

export function createMember(member, callback) {
    return dispatch => {
        StaticLoad.show("createMember");
        post(url.createMember, member)
            .then((res) => {
                StaticLoad.remove("createMember");
                dispatch(createdMember(member));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createMember");
                StaticDialog.show("createMember-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function rtrvMemberDetail(staffId, callback) {
    return dispatch => {
        StaticLoad.show("rtrvMemberDetail");
        get(url.rtrvMemberDetail, {
            staffId: staffId
        })
            .then((res) => {
                StaticLoad.remove("rtrvMemberDetail");
                callback(res);
            })
            .catch((error) => {
                StaticLoad.remove("rtrvMemberDetail");
                StaticDialog.show("rtrvMemberDetail-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function updatedMember(member) {
    return {type: UPDATE_MEMBER, member}
}

export function updateMember(member, callback) {
    return dispatch => {
        StaticLoad.show("updateMember");
        post(url.updateMemberDetail, member)
            .then((res) => {
                StaticLoad.remove("updateMember");
                dispatch(updatedMember(res.responseBody.staffInfo));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateMember");
                StaticDialog.show("updateMember-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function deletedMember(member) {
    return {type: DELETE_MEMBER, member}
}

export function deleteMember(member) {
    return dispatch => {
        StaticLoad.show("deleteMember");
        get(url.deleteMember, {
            staffId: member.staffId
        })
            .then(() => {
                StaticLoad.remove("deleteMember");
                dispatch(deletedMember(member));
            })
            .catch((error) => {
                StaticLoad.remove("deleteMember");
                StaticDialog.show("deleteMember-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}