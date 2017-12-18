import {GET_MATERIEL_LIST, CREATE_MATERIEL, UPDATE_MATERIEL, DELETE_MATERIEL} from '../actions/materiel_action';

function materiel(state = {
    materials: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case GET_MATERIEL_LIST:
            return action.materials;
        case CREATE_MATERIEL:
            let temp = {...state};
            temp.materials.push(action.materiel);
            return temp;
        case UPDATE_MATERIEL:
            let temp2 = {...state};
            temp2.materials.some((materiel) => {
                if (materiel.materielId === action.materiel.materielId) {
                    Object.assign(materiel, action.materiel);
                    return true;
                }
            });
            return Object.assign([], state, temp2);
        case DELETE_MATERIEL:
            let temp3 = {...state};
            temp3.materials.splice(temp3.materials.indexOf(action.materiel), 1);
            temp3.totalElements = temp3.totalElements - 1;
            return temp3;
        default:
            return state
    }
}

export default materiel;