import { authConstants, loadingConstants } from '../constants'

export const fetchLogin = () => {
    return async dispatch => {
        dispatch(loging())
    }

    function loging() {
        return {
            type: loadingConstants.LOADING
        }
    }
}
