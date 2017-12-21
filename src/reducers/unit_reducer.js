import {
    GET_UNIT_LIST,
    CREATE_UNIT,
    UPDATE_UNIT,
    DELETE_UNIT
} from '../actions/unit_action';

function unit(state = [], action) {
    switch (action.type) {
        case GET_UNIT_LIST:
            return action.units;
        case CREATE_UNIT:
            return [...state, action.unit];
        case UPDATE_UNIT:
            let tempState = state;
            tempState.some((item) => {
                if (item.id === action.unit.id) {
                    Object.assign(item, action.unit);
                    return true;
                }
            });
            return Object.assign([], state, tempState);
        case DELETE_UNIT:
            state.splice(state.indexOf(action.unit), 1);
            return Object.assign([], state);
        default:
            return state
    }
}

export default unit;