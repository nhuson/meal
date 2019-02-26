import React, { Component } from "react"
import { connect } from "react-redux"
import TypeIngredientList from '../../views/meal/typeIngredient/TypeIngredientList'
import EditTypeIngredient from '../../views/meal/typeIngredient/EditTypeIngredient'
import { getTypeIngredientsAvailable, deleteTypeIngredient, updateTypeIngredient, addTypeIngredient} from '../../actions'
import { confirmPopupActions , modalAction} from "../../actions"
import ConfirmPopup from '../../components/ConfirmPopup'
import Modal from '../../components/Modal'

class TypeIngredientContainer extends Component {
	constructor(props) {
        super(props)
        this.state = {
			editting: false,
            typeIngredient: {}
		}
	}

	handleEdit = (typeIngredient) => {
		this.setState({editting: true, typeIngredient})
		this.props.openEditPopup()
	}

	handleCreate = () => {
		this.setState({editting: false, typeIngredient: {}})
		this.props.openEditPopup()
	}

	handleDelete = (typeIngredient) => {
		this.setState({typeIngredient})
		this.props.openConfirmPopup()
	}

	render() {
		let { typeIngredients, fetchTypeIngredients, totalRecord, totalPage, loading,
			openConfirm, closeConfirmPopup, onDeleteTypeIngredient,
			openModal, closeEditPopup, onUpdateTypeIngredient, onCreateTypeIngredient} = this.props
		return (
			<div>
				<Modal open={openModal}>
					<EditTypeIngredient 
						editting= {this.state.editting}
						typeIngredient={this.state.typeIngredient}
						handleClose={closeEditPopup}
						handleUpdate={onUpdateTypeIngredient}
						hanldeAdd={onCreateTypeIngredient}
                    />
                </Modal>
				<ConfirmPopup 
                    open={openConfirm} 
                    title='Are you sure you want to delete?'
                    description = "This ingredient type will be deleted from the database and don't display for later."
                    handeDisagree={closeConfirmPopup}
                    handleAgree= {() => {
						closeConfirmPopup()
						onDeleteTypeIngredient(this.state.typeIngredient.id)
					}}
                />
				<TypeIngredientList
					loading={loading}
					typeIngredients={typeIngredients}
					totalRecord={totalRecord}
					totalPage={totalPage}
					fetchTypeIngredients={fetchTypeIngredients}
					handleDelete={this.handleDelete}
					handleEdit={this.handleEdit}
					handleCreate={this.handleCreate}
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
		openConfirm: state.confirmPopup.open,
		openModal: state.modal.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchTypeIngredients: (currentPage, pageSize) => {
			dispatch(getTypeIngredientsAvailable(currentPage, pageSize))
		},
		onCreateTypeIngredient: (typeIngredient) => {
			dispatch(addTypeIngredient(typeIngredient))
		},
		onDeleteTypeIngredient: (id) => {
			dispatch(deleteTypeIngredient(id))
		},
		onUpdateTypeIngredient: (typeIngredient) => {
			dispatch(updateTypeIngredient(typeIngredient))
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

export default connect(mapStateToProps, mapDispatchToProps)(TypeIngredientContainer)
