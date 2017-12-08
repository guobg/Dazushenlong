/*
 * action 类型
 */
import {post, get} from '../util/request';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';

export const GET_SERVICE_ITEM_LIST = 'GET_SERVICE_ITEM_LIST';
export const CREATE_SERVICE_ITEM = 'CREATE_SERVICE_ITEM';
export const UPDATE_SERVICE_ITEM = 'UPDATE_SERVICE_ITEM';
export const DELETE_SERVICE_ITEM = 'DELETE_SERVICE_ITEM';

/*
 * action 创建函数
 */

function retrievedServiceItemList(serviceItems) {
    return {type: GET_SERVICE_ITEM_LIST, serviceItems}
}

export function getServiceItemList(page, pageSize) {
    return dispatch => {
        post(url.getServiceItemList, {
            page: page,
            pageSize: pageSize
        })
            .then((res) => {
                dispatch(retrievedServiceItemList({
                    serviceItems: res.responseBody.serviceItems,
                    totalElements: res.responseBody.totalNumber
                }));
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

function createdServiceItem(serviceItem) {
    return {type: CREATE_SERVICE_ITEM, serviceItem}
}

export function createServiceItem(serviceItem, callback) {
    return dispatch => {
        StaticLoad.show("createServiceItem");
        post(url.createServiceItem, serviceItem)
            .then((res) => {
                StaticLoad.remove("createServiceItem");
                dispatch(createdServiceItem(serviceItem));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createServiceItem");
                StaticDialog.show("createServiceItem-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function rtrvServiceItemDetail(staffId, callback) {
    return dispatch => {
        StaticLoad.show("rtrvServiceItemDetail");
        get(url.rtrvServiceItemDetail, {
            staffId: staffId
        })
            .then((res) => {
                StaticLoad.remove("rtrvServiceItemDetail");
                callback(res);
            })
            .catch((error) => {
                StaticLoad.remove("rtrvServiceItemDetail");
                StaticDialog.show("rtrvServiceItemDetail-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function updatedServiceItem(serviceItem) {
    return {type: UPDATE_SERVICE_ITEM, serviceItem}
}

export function updateServiceItem(serviceItem, callback) {
    return dispatch => {
        StaticLoad.show("updateServiceItem");
        post(url.updateServiceItem, serviceItem)
            .then((res) => {
                StaticLoad.remove("updateServiceItem");
                dispatch(updatedServiceItem(serviceItem));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateServiceItem");
                StaticDialog.show("updateServiceItem-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function deletedServiceItem(serviceItem) {
    return {type: DELETE_SERVICE_ITEM, serviceItem}
}

export function deleteServiceItem(serviceItem) {
    return dispatch => {
        StaticLoad.show("deleteServiceItem");
        get(url.deleteServiceItem, {
            staffId: serviceItem.staffId
        })
            .then(() => {
                StaticLoad.remove("deleteServiceItem");
                dispatch(deletedServiceItem(serviceItem));
            })
            .catch((error) => {
                StaticLoad.remove("deleteServiceItem");
                StaticDialog.show("deleteServiceItem-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}