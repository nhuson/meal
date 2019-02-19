import React, { Component } from "react"
import { connect } from "react-redux"
import CategoryList from '../../views/meal/category/CategoryList'
import EditCategory from '../../views/meal/category/EditCategory'
import Modal from '../../components/Modal'
import { getCategoriesAvailable, deleteCategory, updateCategory, addCategory} from '../../actions'
import { confirmPopupActions, modalAction } from "../../actions"
import ConfirmPopup from '../../components/ConfirmPopup'

class CategoryContainer extends Component {
	constructor(props) {
        super(props)
        this.state = {
			editting: false,
            category: {}
		}
	}

	handleEdit = (category) => {
		this.setState({editting: true, category})
		this.props.openEditPopup()
	}

	handleCreate = () => {
		this.setState({editting: false, category: {}})
		this.props.openEditPopup()
	}

	handleDelete = (category) => {
		this.setState({category})
		this.props.openConfirmPopup()
	}


	render() {
		let { categories, fetchCategories, totalRecord, totalPage, loading,
			openConfirm, onDeleteCategory, closeConfirmPopup,
			openModal, closeEditPopup, onUpdateCategory, onCreateCategory} = this.props
		return (
			<div>
				<Modal open={openModal}>
					<EditCategory 
						editting= {this.state.editting}
						category={this.state.category}
						handleClose={closeEditPopup}
						handleUpdate={this.state.editting ? onUpdateCategory : onCreateCategory}
                    />
                </Modal>
				 <ConfirmPopup 
                    open={openConfirm} 
                    title='Are you sure you want to delete?'
                    description = "This category will be deleted from the database and don't display for later."
					handeDisagree={closeConfirmPopup}
                    handleAgree= {() => {
						closeConfirmPopup()
						onDeleteCategory(this.state.category.id)
					}}
				/>
				<CategoryList
					loading={loading}
					categories={categories}
					totalRecord={totalRecord}
					totalPage={totalPage}
					fetchCategories={fetchCategories}
					handleEdit={this.handleEdit}
					handleDelete={this.handleDelete}
					handleCreate={this.handleCreate}
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
		openConfirm: state.confirmPopup.open,
		openModal: state.modal.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchCategories: (currentPage, pageSize) => {
			dispatch(getCategoriesAvailable(currentPage, pageSize))
		},
		onDeleteCategory: (categoryId) => {
			dispatch(deleteCategory(categoryId))
		},
		onUpdateCategory: (category) => {
			dispatch(updateCategory(category))
		},
		onCreateCategory: (category) => {
			dispatch(addCategory(category))
		},
		openConfirmPopup: () => {
			dispatch(confirmPopupActions.open())
		},
		closeConfirmPopup: () => {
			dispatch(confirmPopupActions.close())
		},
		openEditPopup: () => {
			dispatch(modalAction.openModal())
		},
		closeEditPopup: () => {
			dispatch(modalAction.closeModal())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer)
