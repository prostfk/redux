import {LOAD_USERS, SEARCH, SORT_ASC, SORT_DESC} from "../constants/userActionTypes";
import usersArray from "../data/usersArray";

export default (state=[], action) => {

    switch (action.type) {
        case LOAD_USERS:
            return usersArray;
        case SORT_ASC:
            return state.splice(0).sort((a,b)=> a[action.payload] < b[action.payload] ? -1 : 1);
        case SORT_DESC:
            return state.splice(0).sort((a,b)=> a[action.payload] > b[action.payload] ? -1 : 1);
        case SEARCH:
            let parameters = action.payload;
            let array = usersArray;
            let search = [];
            parameters.map((value, index) => {
                for (let i = 0; i < array.length; i++) {
                    if (array[i][value.parameter].toString() === value.value){
                        search.push(array[i]);
                    }
                }
            });
            return Array.from(new Set(search));
        default:
            return state;
    }

}