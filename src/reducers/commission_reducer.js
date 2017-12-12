import {
    GET_COMMISSION_LIST,
    UPDATE_COMMISSION,
    DELETE_COMMISSION
} from '../actions/commission_action';

function commission(state = [], action) {
    switch (action.type) {
        case GET_COMMISSION_LIST:
            return action.commissions;
        case UPDATE_COMMISSION:
            state.some((commission) => {
                if (commission.id === action.commission.id) {
                    Object.assign(commission, action.commission);
                    return true;
                }
            });
            return state;
        case DELETE_COMMISSION:
            state.splice(state.indexOf(action.commission), 1);
            return state;
        default:
            return state
    }
}

export default commission;