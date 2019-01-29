import React, { Component } from "react"
import { connect } from "react-redux"
import TypeIngredientList from '../../views/meal/TypeIngredientList'
import { getTypeIngredientsAvailable, deleteTypeIngredient} from '../../actions'
import { confirmPopupActions } from "../../actions"

class TypeIngredientContainer extends Component {
	render() {
		let { typeIngredients, fetchTypeIngredients, totalRecord, totalPage, loading,
			handleDelete, openConfirmPopup, handlePopupDisagree, handlePopupAgree } = this.props
		return (
			<div>
				<TypeIngredientList
					loading={loading}
					typeIngredients={typeIngredients}
					totalRecord={totalRecord}
					totalPage={totalPage}
					fetchTypeIngredients={fetchTypeIngredients}
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
		typeIngredients: state.typeIngredient.typeIngredients,
		totalRecord: state.typeIngredient.total_record,
		totalPage: state.typeIngredient.total_page,
		loading: state.loading.status,
		openConfirmPopup: state.confirmPopup.open
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchTypeIngredients: (currentPage, pageSize) => {
			dispatch(getTypeIngredientsAvailable(currentPage, pageSize))
		},
		handleDelete: () => {
			dispatch(confirmPopupActions.open())
		},
		handlePopupDisagree: () => {
			dispatch(confirmPopupActions.disagree())
		},
		handlePopupAgree: (typeIngredientId) => {
			dispatch(confirmPopupActions.agree())
			dispatch(deleteTypeIngredient(typeIngredientId))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeIngredientContainer)
