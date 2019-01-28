import React, { Component } from "react"
import { connect } from "react-redux"
import CategoryList from '../../views/meal/CategoryList'
import { getCategoriesAvailable} from '../../actions'

class CategoryContainer extends Component {
	render() {
		let { categories, fetchCategories, totalRecord, totalPage, loading } = this.props
		return (
			<div>
				<CategoryList
					loading={loading}
					categories={categories}
					totalRecord={totalRecord}
					totalPage={totalPage}
					fetchCategories={fetchCategories}
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
		loading: state.loading.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchCategories: (currentPage, pageSize) => {
			dispatch(getCategoriesAvailable(currentPage, pageSize))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer)
