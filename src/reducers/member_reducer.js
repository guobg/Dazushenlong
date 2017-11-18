import {GET_MEMBER_LIST, CREATE_MEMBER, UPDATE_MEMBER, DELETE_MEMBER} from '../actions/member_action';

function member(state = {
    members: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case GET_MEMBER_LIST:
            return action.members;
        case CREATE_MEMBER:
            let temp = {...state};
            temp.members.push(action.member);
            return temp;
        case UPDATE_MEMBER:
            let temp2 = {...state};
            temp2.members.some((member) => {
                if (member.memberId === action.member.memberId) {
                    Object.assign(member, action.member);
                    return true;
                }
            });
            return Object.assign([], state, temp2);
        case DELETE_MEMBER:
            let temp3 = {...state};
            temp3.members.splice(temp3.members.indexOf(action.member), 1);
            temp3.totalElements = temp3.totalElements - 1;
            return temp3;
        default:
            return state
    }
}

export default member;