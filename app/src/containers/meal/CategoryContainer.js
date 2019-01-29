import React, { Component } from "react"
import { connect } from "react-redux"
import CategoryList from '../../views/meal/CategoryList'
import { getCategoriesAvailable, deleteCategory} from '../../actions'
import { confirmPopupActions } from "../../actions"

class CategoryContainer extends Component {
	render() {
		let { categories, fetchCategories, totalRecord, totalPage, loading, 
			handleDelete, openConfirmPopup, handlePopupDisagree, handlePopupAgree, deleteCategory } = this.props
		return (
			<div>
				<CategoryList
					loading={loading}
					categories={categories}
					totalRecord={totalRecord}
					totalPage={totalPage}
					fetchCategories={fetchCategories}
					handleDelete={handleDelete}
					openConfirmPopup={openConfirmPopup}
					handlePopupDisagree={handlePopupDisagree}
					handlePopupAgree={handlePopupAgree}
					deleteCategory={deleteCategory}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		categories: state.category.categories,
		totalRecord: state.category.total_record,
		totalPage: state.category.total_page,
		loading: state.loading.status,
		openConfirmPopup: state.confirmPopup.open
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchCategories: (currentPage, pageSize) => {
			dispatch(getCategoriesAvailable(currentPage, pageSize))
		},
		handleDelete: () => {
			dispatch(confirmPopupActions.open())
		},
		handlePopupDisagree: () => {
			dispatch(confirmPopupActions.disagree())
		},
		handlePopupAgree: (catId) => {
			dispatch(confirmPopupActions.agree())
			dispatch(deleteCategory(catId))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer)
