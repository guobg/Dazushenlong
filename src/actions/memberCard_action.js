/*
 * action 类型
 */
import {post, get} from '../util/request';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';
import {save, getListAndCount, remove} from '../util/CommInterface';

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
        getListAndCount('base_member_card_type', page, pageSize)
            .then((res) => {
                dispatch(retrievedMemberCardList({
                    memberCards: res.data.rows,
                    totalElements: res.data.total
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
        save('base_member_card_type', memberCard)
            .then((res) => {
                StaticLoad.remove("createMemberCard");
                dispatch(createdMemberCard(res.data.save_data.header));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createMemberCard");
                StaticDialog.show("createMemberCard-error", error.responseCode, error.message);
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
        save('base_member_card_type', memberCard)
            .then((res) => {
                StaticLoad.remove("updateMemberCard");
                dispatch(updatedMemberCard(res.data.save_data.header));
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
        remove('base_member_card_type', [memberCard.id])
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