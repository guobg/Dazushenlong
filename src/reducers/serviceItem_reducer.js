import {GET_SERVICE_ITEM_LIST, CREATE_SERVICE_ITEM, UPDATE_SERVICE_ITEM, DELETE_SERVICE_ITEM} from '../actions/serviceItem_action';

function serviceItem(state = {
    serviceItems: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case GET_SERVICE_ITEM_LIST:
            return action.serviceItems;
        case CREATE_SERVICE_ITEM:
            let temp = {...state};
            temp.serviceItems.push(action.serviceItem);
            return temp;
        case UPDATE_SERVICE_ITEM:
            let temp2 = {...state};
            temp2.serviceItems.some((serviceItem) => {
                if (serviceItem.serviceItemId === action.serviceItem.serviceItemId) {
                    Object.assign(serviceItem, action.serviceItem);
                    return true;
                }
            });
            return Object.assign([], state, temp2);
        case DELETE_SERVICE_ITEM:
            let temp3 = {...state};
            temp3.serviceItems.splice(temp3.serviceItems.indexOf(action.serviceItem), 1);
            temp3.totalElements = temp3.totalElements - 1;
            return temp3;
        default:
            return state
    }
}

export default serviceItem;