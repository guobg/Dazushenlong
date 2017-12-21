/*
 * action 类型
 */
import {post, get} from '../util/request';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';

export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

/*
 * action 创建函数
 */

function retrievedProductList(materials) {
    return {type: GET_PRODUCT_LIST, materials}
}

export function getProductList(page, pageSize) {
    return dispatch => {
        post(url.getProductList, {
            page: page,
            pageSize: pageSize
        })
            .then((res) => {
                dispatch(retrievedProductList({
                    materials: res.responseBody.materials,
                    totalElements: res.responseBody.totalNumber
                }));
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

function createdProduct(product) {
    return {type: CREATE_PRODUCT, product}
}

export function createProduct(product, callback) {
    return dispatch => {
        StaticLoad.show("createProduct");
        post(url.createProduct, product)
            .then((res) => {
                StaticLoad.remove("createProduct");
                dispatch(createdProduct(product));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createProduct");
                StaticDialog.show("createProduct-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function rtrvProductDetail(staffId, callback) {
    return dispatch => {
        StaticLoad.show("rtrvProductDetail");
        get(url.rtrvProductDetail, {
            staffId: staffId
        })
            .then((res) => {
                StaticLoad.remove("rtrvProductDetail");
                callback(res);
            })
            .catch((error) => {
                StaticLoad.remove("rtrvProductDetail");
                StaticDialog.show("rtrvProductDetail-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function updatedProduct(product) {
    return {type: UPDATE_PRODUCT, product}
}

export function updateProduct(product, callback) {
    return dispatch => {
        StaticLoad.show("updateProduct");
        post(url.updateProduct, product)
            .then((res) => {
                StaticLoad.remove("updateProduct");
                dispatch(updatedProduct(product));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateProduct");
                StaticDialog.show("updateProduct-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function deletedProduct(product) {
    return {type: DELETE_PRODUCT, product}
}

export function deleteProduct(product) {
    return dispatch => {
        StaticLoad.show("deleteProduct");
        get(url.deleteProduct, {
            staffId: product.staffId
        })
            .then(() => {
                StaticLoad.remove("deleteProduct");
                dispatch(deletedProduct(product));
            })
            .catch((error) => {
                StaticLoad.remove("deleteProduct");
                StaticDialog.show("deleteProduct-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}