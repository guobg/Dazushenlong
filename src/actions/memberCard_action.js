/*
 * action 类型
 */
import {post, get} from '../util/request';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';

export const GET_MEMBER_CARD_LIST = 'GET_MEMBER_CARD_LIST';
export const CREATE_MEMBER_CARD = 'CREATE_MEMBER_CARD';
export const UPDATE_MEMBER_CARD = 'UPDATE_MEMBER_CARD';
export const DELETE_MEMBER_CARD = 'DELETE_MEMBER_CARD';

/*
 * action 创建函数
 */

function retrievedMemberCardList(memberCards) {
    return {type: GET_MEMBER_CARD_LIST, memberCards}
}

export function getMemberCardList(page, pageSize) {
    return dispatch => {
        post(url.getMemberCardList, {
            page: page,
            pageSize: pageSize
        })
            .then((res) => {
                dispatch(retrievedMemberCardList({
                    memberCards: res.responseBody.memberCards,
                    totalElements: res.responseBody.totalNumber
                }));
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

function createdMemberCard(memberCard) {
    return {type: CREATE_MEMBER_CARD, memberCard}
}

export function createMemberCard(memberCard, callback) {
    return dispatch => {
        StaticLoad.show("createMemberCard");
        post(url.createMemberCard, memberCard)
            .then((res) => {
                StaticLoad.remove("createMemberCard");
                dispatch(createdMemberCard(memberCard));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createMemberCard");
                StaticDialog.show("createMemberCard-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function rtrvMemberCardDetail(staffId, callback) {
    return dispatch => {
        StaticLoad.show("rtrvMemberCardDetail");
        get(url.rtrvMemberCardDetail, {
            staffId: staffId
        })
            .then((res) => {
                StaticLoad.remove("rtrvMemberCardDetail");
                callback(res);
            })
            .catch((error) => {
                StaticLoad.remove("rtrvMemberCardDetail");
                StaticDialog.show("rtrvMemberCardDetail-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function updatedMemberCard(memberCard) {
    return {type: UPDATE_MEMBER_CARD, memberCard}
}

export function updateMemberCard(memberCard, callback) {
    return dispatch => {
        StaticLoad.show("updateMemberCard");
        post(url.updateMemberCard, memberCard)
            .then((res) => {
                StaticLoad.remove("updateMemberCard");
                dispatch(updatedMemberCard(memberCard));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateMemberCard");
                StaticDialog.show("updateMemberCard-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function deletedMemberCard(memberCard) {
    return {type: DELETE_MEMBER_CARD, memberCard}
}

export function deleteMemberCard(memberCard) {
    return dispatch => {
        StaticLoad.show("deleteMemberCard");
        get(url.deleteMemberCard, {
            staffId: memberCard.staffId
        })
            .then(() => {
                StaticLoad.remove("deleteMemberCard");
                dispatch(deletedMemberCard(memberCard));
            })
            .catch((error) => {
                StaticLoad.remove("deleteMemberCard");
                StaticDialog.show("deleteMemberCard-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}