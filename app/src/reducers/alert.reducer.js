import { alertConstants } from "../constants";
const initialState = {
    status: false
}
const alert = (state = initialState, action) => {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                ...state,
                type: "success",
                message: action.message,
                status: true
            }
        case alertConstants.ERROR:
            return {
                type: "danger",
                message: action.message,
                status: true
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state;
    }
};

export default alert