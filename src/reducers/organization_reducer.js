import {SET_ORGANIZATION} from '../actions/organization_action';

function organization(state = {}, action) {
    switch (action.type) {
        case SET_ORGANIZATION:
            return action.organization;
        default:
            return state;
    }
}

export default organization;