import {
    GET_MEMBER_CARD_LIST,
    CREATE_MEMBER_CARD,
    UPDATE_MEMBER_CARD,
    DELETE_MEMBER_CARD
} from '../actions/memberCard_action';

function memberCard(state = {
    memberCards: [],
    totalElements: 0
}, action) {
    switch (action.type) {
        case GET_MEMBER_CARD_LIST:
            return action.memberCards;
        case CREATE_MEMBER_CARD:
            let temp = {...state};
            temp.memberCards.push(action.memberCard);
            return temp;
        case UPDATE_MEMBER_CARD:
            let temp2 = {...state};
            temp2.memberCards.some((memberCard) => {
                if (memberCard.id === action.memberCard.id) {
                    Object.assign(memberCard, action.memberCard);
                    return true;
                }
            });
            return Object.assign([], state, temp2);
        case DELETE_MEMBER_CARD:
            let temp3 = {...state};
            temp3.memberCards.splice(temp3.memberCards.indexOf(action.memberCard), 1);
            temp3.totalElements = temp3.totalElements - 1;
            return temp3;
        default:
            return state
    }
}

export default memberCard;