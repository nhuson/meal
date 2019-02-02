import { loadingConstants } from '../constants'

const initialState = {
    status: false,
    requesting: false
}

const loading = (state = initialState, action) => {
    switch(action.type) {
        case loadingConstants.LOADING:
            return { ...state, status: true }
            break
        case loadingConstants.DONE:
            return { ...state, status: false }
            break
        case loadingConstants.REQUESTING:
            return { ...state, requesting: true }
            break
        case loadingConstants.REQUEST_DONE:
            return { ...state, requesting: false }
            break
        default:
        return state    
    }
}

export default loading
