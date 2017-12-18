import {
    GET_MATERIEL_UNIT_LIST,
    CREATE_MATERIEL_UNIT,
    UPDATE_MATERIEL_UNIT,
    DELETE_MATERIEL_UNIT
} from '../actions/materielUnit_action';

function materielUnit(state = [], action) {
    switch (action.type) {
        case GET_MATERIEL_UNIT_LIST:
            return action.materielUnits;
        case CREATE_MATERIEL_UNIT:
            return [...state, action.materielUnit];
        case UPDATE_MATERIEL_UNIT:
            let tempState = state;
            tempState.some((item) => {
                if (item.materielUnitId === action.materielUnit.materielUnitId) {
                    Object.assign(item, action.materielUnit);
                    return true;
                }
            });
            return Object.assign([], state, tempState);
        case DELETE_MATERIEL_UNIT:
            return state;
        default:
            return state
    }
}

export default materielUnit;