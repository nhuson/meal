import { loadingConstants } from '../constants'

const initialState = {
    status: false
}

const loading = (state = initialState, action) => {
    switch(action.type) {
        case loadingConstants.LOADING:
            return { ...state, status: true }
            break
        case loadingConstants.DONE:
            return { ...state, status: false }
            break
        default:
        return state    
    }
}

export default loading
