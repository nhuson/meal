import React, { Component } from "react"
import { connect } from "react-redux"
import IngredientList from '../../views/meal/IngredientList'
import { getIngredientsAvailable, deleteIngredient} from '../../actions'
import { confirmPopupActions } from "../../actions"

class IngredientContainer extends Component {
	render() {
		let { ingredients, fetchIngredients, totalRecord, totalPage, loading,
			handleDelete, openConfirmPopup, handlePopupDisagree, handlePopupAgree } = this.props
		return (
			<div>
				<IngredientList
					loading={loading}
					ingredients={ingredients}
					totalRecord={totalRecord}
					totalPage={totalPage}
					fetchIngredients={fetchIngredients}
					handleDelete={handleDelete}
					openConfirmPopup={openConfirmPopup}
					handlePopupDisagree={handlePopupDisagree}
					handlePopupAgree={handlePopupAgree}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.ingredient.ingredients,
		totalRecord: state.ingredient.total_record,
		totalPage: state.ingredient.total_page,
		loading: state.loading.status,
		openConfirmPopup: state.confirmPopup.open
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchIngredients: (currentPage, pageSize) => {
			dispatch(getIngredientsAvailable(currentPage, pageSize))
		},
		handleDelete: () => {
			dispatch(confirmPopupActions.open())
		},
		handlePopupDisagree: () => {
			dispatch(confirmPopupActions.disagree())
		},
		handlePopupAgree: (ingredientId) => {
			dispatch(confirmPopupActions.agree())
			dispatch(deleteIngredient(ingredientId))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientContainer)
