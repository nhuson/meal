import {
    confirmPopupConstants
} from "../constants";
const initialState = {
    open: false
}
const confirmPopup = (state = initialState, action) => {
    switch (action.type) {
        case confirmPopupConstants.CLOSE:
            return {
                ...state,
                open: false
            }
        case confirmPopupConstants.OPEN:
            return {
                ...state,
                open: true
            }
        default:
            return state;
    }
};

export default confirmPopup