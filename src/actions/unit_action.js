/*
 * action 类型
 */
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {save, getList, remove} from '../util/CommInterface';

export const GET_UNIT_LIST = 'GET_UNIT_LIST';
export const CREATE_UNIT = 'CREATE_UNIT';
export const UPDATE_UNIT = 'UPDATE_UNIT';
export const DELETE_UNIT = 'DELETE_UNIT';

/*
 * action 创建函数
 */

function retrievedUnitList(units) {
    return {type: GET_UNIT_LIST, units}
}

export function getUnitList() {
    return dispatch => {
        getList('base_unit')
            .then((res) => {
                dispatch(retrievedUnitList(res.data));
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

function createdUnit(unit) {
    return {type: CREATE_UNIT, unit}
}

export function createUnit(unit, callback) {
    return dispatch => {
        StaticLoad.show("createUnit");
        save('base_unit', unit)
            .then((res) => {
                StaticLoad.remove("createUnit");
                dispatch(createdUnit(res.data.save_data.header));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createUnit");
                StaticDialog.show("createUnit-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function updatedUnit(unit) {
    return {type: UPDATE_UNIT, unit}
}

export function updateUnit(unit, callback) {
    return dispatch => {
        StaticLoad.show("updateUnit");
        save('base_unit', unit)
            .then((res) => {
                StaticLoad.remove("updateUnit");
                dispatch(updatedUnit(res.data.save_data.header));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateUnit");
                StaticDialog.show("updateUnit-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function deletedUnit(unit) {
    return {type: DELETE_UNIT, unit}
}

export function deleteUnit(unit) {
    return dispatch => {
        StaticLoad.show("deleteUnit");
        remove('base_unit', [unit.id])
            .then(() => {
                StaticLoad.remove("deleteUnit");
                dispatch(deletedUnit(unit));
            })
            .catch((error) => {
                StaticLoad.remove("deleteUnit");
                StaticDialog.show("deleteUnit-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}