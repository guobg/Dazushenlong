/*
 * action 类型
 */
import {post, get} from '../util/request';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';

export const GET_MATERIEL_LIST = 'GET_MATERIEL_LIST';
export const CREATE_MATERIEL = 'CREATE_MATERIEL';
export const UPDATE_MATERIEL = 'UPDATE_MATERIEL';
export const DELETE_MATERIEL = 'DELETE_MATERIEL';

/*
 * action 创建函数
 */

function retrievedMaterielList(materials) {
    return {type: GET_MATERIEL_LIST, materials}
}

export function getMaterielList(page, pageSize) {
    return dispatch => {
        post(url.getMaterielList, {
            page: page,
            pageSize: pageSize
        })
            .then((res) => {
                dispatch(retrievedMaterielList({
                    materials: res.responseBody.materials,
                    totalElements: res.responseBody.totalNumber
                }));
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

function createdMateriel(materiel) {
    return {type: CREATE_MATERIEL, materiel}
}

export function createMateriel(materiel, callback) {
    return dispatch => {
        StaticLoad.show("createMateriel");
        post(url.createMateriel, materiel)
            .then((res) => {
                StaticLoad.remove("createMateriel");
                dispatch(createdMateriel(materiel));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createMateriel");
                StaticDialog.show("createMateriel-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function rtrvMaterielDetail(staffId, callback) {
    return dispatch => {
        StaticLoad.show("rtrvMaterielDetail");
        get(url.rtrvMaterielDetail, {
            staffId: staffId
        })
            .then((res) => {
                StaticLoad.remove("rtrvMaterielDetail");
                callback(res);
            })
            .catch((error) => {
                StaticLoad.remove("rtrvMaterielDetail");
                StaticDialog.show("rtrvMaterielDetail-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function updatedMateriel(materiel) {
    return {type: UPDATE_MATERIEL, materiel}
}

export function updateMateriel(materiel, callback) {
    return dispatch => {
        StaticLoad.show("updateMateriel");
        post(url.updateMateriel, materiel)
            .then((res) => {
                StaticLoad.remove("updateMateriel");
                dispatch(updatedMateriel(materiel));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateMateriel");
                StaticDialog.show("updateMateriel-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function deletedMateriel(materiel) {
    return {type: DELETE_MATERIEL, materiel}
}

export function deleteMateriel(materiel) {
    return dispatch => {
        StaticLoad.show("deleteMateriel");
        get(url.deleteMateriel, {
            staffId: materiel.staffId
        })
            .then(() => {
                StaticLoad.remove("deleteMateriel");
                dispatch(deletedMateriel(materiel));
            })
            .catch((error) => {
                StaticLoad.remove("deleteMateriel");
                StaticDialog.show("deleteMateriel-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}