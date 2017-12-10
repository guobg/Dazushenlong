import {
    GET_COMMISSION_LIST,
    CREATE_COMMISSION,
    UPDATE_COMMISSION,
    DELETE_COMMISSION
} from '../actions/commission_action';

function commission(state = [], action) {
    switch (action.type) {
        case GET_COMMISSION_LIST:
            return action.commissions;
        case CREATE_COMMISSION:
            let temp = {...state};
            temp.commissions.push(action.commission);
            return temp;
        case UPDATE_COMMISSION:
            let temp2 = {...state};
            temp2.commissions.some((commission) => {
                if (commission.commissionId === action.commission.commissionId) {
                    Object.assign(commission, action.commission);
                    return true;
                }
            });
            return Object.assign([], state, temp2);
        case DELETE_COMMISSION:
            let temp3 = {...state};
            temp3.commissions.splice(temp3.commissions.indexOf(action.commission), 1);
            temp3.totalElements = temp3.totalElements - 1;
            return temp3;
        default:
            return state
    }
}

export default commission;