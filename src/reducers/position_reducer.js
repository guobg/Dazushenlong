import {
    GET_POSITION_LIST,
    CREATE_POSITION,
    UPDATE_POSITION,
    DELETE_POSITION
} from '../actions/position_action';

function position(state = {
    positions: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case GET_POSITION_LIST:
            return action.positions;
        case CREATE_POSITION:
            let temp = {...state};
            temp.positions.push(action.position);
            return temp;
        case UPDATE_POSITION:
            let temp2 = {...state};
            temp2.positions.some((position) => {
                if (position.id === action.position.id) {
                    Object.assign(position, action.position);
                    return true;
                }
            });
            return Object.assign([], state, temp2);
        case DELETE_POSITION:
            let temp3 = {...state};
            temp3.positions.splice(temp3.positions.indexOf(action.position), 1);
            temp3.totalElements = temp3.totalElements - 1;
            return temp3;
        default:
            return state
    }
}

export default position;