/*
 * action 类型
 */
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {save, getListAndCount, remove} from '../util/CommInterface';

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
        getListAndCount('base_product', page, pageSize)
            .then((res) => {
                dispatch(retrievedProductList({
                    materials: res.data.rows,
                    totalElements: res.data.total
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
        save('base_product', product)
            .then((res) => {
                StaticLoad.remove("createProduct");
                dispatch(createdProduct(res.data.save_data.header));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createProduct");
                StaticDialog.show("createProduct-error", error.responseCode, error.message);
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
        save('base_product', product)
            .then((res) => {
                StaticLoad.remove("updateProduct");
                dispatch(updatedProduct(res.data.save_data.header));
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
        remove('base_product', [product.id])
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