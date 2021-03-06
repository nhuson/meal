import request from '../helpers/request'
import apiUrl from '../variables/api.url'

export const mealApis = {
	getMeals: async (currentPage, pageSize) => {
		return await request(
			'GET',
			`${apiUrl.meal.meal_by_page}?page=${currentPage}&per_page=${pageSize}`,
		)
	},
	getIngredientByMealId: async (id) => {
		return await request('GET', `${apiUrl.meal.ingredient_by_meal_id}/${id}`)
	},
}
