import { mealConstants } from '../constants'
import { alertActions } from './alert.action'
import { loadingActions } from './loading.action'
import { modalAction } from './modal.action'
import { mealApis } from '../api'

export const mealActions = {
    getMeals: (currentPage, pageSize) => {
        return async dispatch => {
			try {
				dispatch(loadingActions.loading())
				let resp = await mealApis.getMeals(currentPage, pageSize)
				dispatch({ type: mealConstants.meal.MEAL_AVAILABLE, meals: resp.data.meals, total_page: resp.data.total_page, total_record: resp.data.total_record })
				dispatch(loadingActions.done())
			}catch(err) {
				dispatch(alertActions.error(err))
				dispatch(loadingActions.done())
			}
		}
    }
}