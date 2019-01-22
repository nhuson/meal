import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const userLogin = async user => {
    let data = await request("POST", apiUrl.user.login, user)
    return data
}   
