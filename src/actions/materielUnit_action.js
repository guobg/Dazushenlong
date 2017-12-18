/*
 * action 类型
 */
import {post, get} from '../util/request';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';

export const GET_MATERIEL_UNIT_LIST = 'GET_MATERIEL_UNIT_LIST';
export const CREATE_MATERIEL_UNIT = 'CREATE_MATERIEL_UNIT';
export const UPDATE_MATERIEL_UNIT = 'UPDATE_MATERIEL_UNIT';
export const DELETE_MATERIEL_UNIT = 'DELETE_MATERIEL_UNIT';

/*
 * action 创建函数
 */

function retrievedMaterielUnitList(materielUnits) {
    return {type: GET_MATERIEL_UNIT_LIST, materielUnits}
}

export function getMaterielUnitList() {
    return dispatch => {
        post(url.getMaterielUnitList, {})
            .then((res) => {
                dispatch(retrievedMaterielUnitList(res.responseBody));
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

function createdMaterielUnit(materielUnit) {
    return {type: CREATE_MATERIEL_UNIT, materielUnit}
}

export function createMaterielUnit(materielUnit, callback) {
    return dispatch => {
        StaticLoad.show("createMaterielUnit");
        post(url.createMaterielUnit, materielUnit)
            .then((res) => {
                StaticLoad.remove("createMaterielUnit");
                dispatch(createdMaterielUnit(materielUnit));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createMaterielUnit");
                StaticDialog.show("createMaterielUnit-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function rtrvMaterielUnitDetail(staffId, callback) {
    return dispatch => {
        StaticLoad.show("rtrvMaterielUnitDetail");
        get(url.rtrvMaterielUnitDetail, {
            staffId: staffId
        })
            .then((res) => {
                StaticLoad.remove("rtrvMaterielUnitDetail");
                callback(res);
            })
            .catch((error) => {
                StaticLoad.remove("rtrvMaterielUnitDetail");
                StaticDialog.show("rtrvMaterielUnitDetail-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function updatedMaterielUnit(materielUnit) {
    return {type: UPDATE_MATERIEL_UNIT, materielUnit}
}

export function updateMaterielUnit(materielUnit, callback) {
    return dispatch => {
        StaticLoad.show("updateMaterielUnit");
        post(url.updateMaterielUnit, materielUnit)
            .then((res) => {
                StaticLoad.remove("updateMaterielUnit");
                dispatch(updatedMaterielUnit(materielUnit));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateMaterielUnit");
                StaticDialog.show("updateMaterielUnit-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function deletedMaterielUnit(materielUnit) {
    return {type: DELETE_MATERIEL_UNIT, materielUnit}
}

export function deleteMaterielUnit(materielUnit) {
    return dispatch => {
        StaticLoad.show("deleteMaterielUnit");
        get(url.deleteMaterielUnit, {
            staffId: materielUnit.staffId
        })
            .then(() => {
                StaticLoad.remove("deleteMaterielUnit");
                dispatch(deletedMaterielUnit(materielUnit));
            })
            .catch((error) => {
                StaticLoad.remove("deleteMaterielUnit");
                StaticDialog.show("deleteMaterielUnit-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}