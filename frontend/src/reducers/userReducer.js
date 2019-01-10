import {FIND_BY_ID, LOAD_USERS, SEARCH, SET_USER, SET_USERS, SORT_ASC, SORT_DESC} from "../constants/userActionTypes";
import usersArray from "../data/usersArray";

export default (state = [], action) => {

    switch (action.type) {
        case LOAD_USERS:
            fetch('/api/getContacts').then(resp => resp.json()).then(data => data);
            break;
        case SORT_ASC:
            return state.splice(0).sort((a, b) => a[action.payload] < b[action.payload] ? -1 : 1);
        case SORT_DESC:
            return state.splice(0).sort((a, b) => a[action.payload] > b[action.payload] ? -1 : 1);
        case SEARCH:
            let parameters = action.payload;
            let array = usersArray.splice(0);
            let search = [];
            parameters.map((value, index) => {
                for (let i = 0; i < array.length; i++) {
                    if (array[i][value.parameter].toString() === (value.value)) {
                        search.push(array[i]);
                    }
                }
            });
            return Array.from(new Set(search));
        case FIND_BY_ID:
            let user;
            for (let i = 0; i < usersArray.length; i++) {
                if (usersArray[i].id.toString() === action.payload) {
                    return usersArray[i];
                }
            }
            return user ? (user) : null;
        case SET_USERS:
            return action.payload;
        case SET_USER:
            return action.payload;
        default:
            return state;
    }

}