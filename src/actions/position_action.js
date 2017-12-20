/*
 * action 类型
 */
import {post} from '../util/request';
import {save, getListAndCount, remove} from '../util/CommInterface';
import {
    convertPositionToServer,
    convertPositionToLocal,
    convertPositionsToLocal
} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';

export const GET_POSITION_LIST = 'GET_POSITION_LIST';
export const CREATE_POSITION = 'CREATE_POSITION';
export const UPDATE_POSITION = 'UPDATE_POSITION';
export const DELETE_POSITION = 'DELETE_POSITION';

/*
 * action 创建函数
 */

function retrievedPositionList(positions) {
    return {type: GET_POSITION_LIST, positions}
}

export function getPositionList(page, pageSize) {
    return dispatch => {
        getListAndCount('base_position', page, pageSize)
            .then((res) => {
                dispatch(retrievedPositionList({
                    positions: convertPositionsToLocal(res.data.rows),
                    totalElements: res.data.total
                }));
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

function createdPosition(position) {
    return {type: CREATE_POSITION, position}
}

export function createPosition(position, callback) {
    return dispatch => {
        StaticLoad.show("createPosition");
        let params = convertPositionToServer(position);
        save('base_position', params)
            .then((res) => {
                StaticLoad.remove("createPosition");
                let resPosition = convertPositionToLocal(res.data.save_data.header);
                dispatch(createdPosition(resPosition));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createPosition");
                StaticDialog.show("createPosition-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function updatedPosition(position) {
    return {type: UPDATE_POSITION, position}
}

export function updatePosition(position, callback) {
    return dispatch => {
        StaticLoad.show("updatePosition");
        let params = convertPositionToServer(position);
        save('base_position', params)
            .then((res) => {
                StaticLoad.remove("updatePosition");
                let resPosition = convertPositionToLocal(res.data.save_data.header);
                dispatch(updatedPosition(resPosition));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updatePosition");
                StaticDialog.show("updatePosition-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function deletedPosition(position) {
    return {type: DELETE_POSITION, position}
}

export function deletePosition(position) {
    return dispatch => {
        StaticLoad.show("deletePosition");
        remove('base_position', [position.id])
            .then(() => {
                StaticLoad.remove("deletePosition");
                dispatch(deletedPosition(position));
            })
            .catch((error) => {
                StaticLoad.remove("deletePosition");
                StaticDialog.show("deletePosition-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}