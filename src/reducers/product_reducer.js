import {GET_PRODUCT_LIST, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT} from '../actions/product_action';

function product(state = {
    materials: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case GET_PRODUCT_LIST:
            return action.materials;
        case CREATE_PRODUCT:
            let temp = {...state};
            temp.materials.push(action.product);
            return temp;
        case UPDATE_PRODUCT:
            let temp2 = {...state};
            temp2.materials.some((product) => {
                if (product.productId === action.product.productId) {
                    Object.assign(product, action.product);
                    return true;
                }
            });
            return Object.assign([], state, temp2);
        case DELETE_PRODUCT:
            let temp3 = {...state};
            temp3.materials.splice(temp3.materials.indexOf(action.product), 1);
            temp3.totalElements = temp3.totalElements - 1;
            return temp3;
        default:
            return state
    }
}

export default product;