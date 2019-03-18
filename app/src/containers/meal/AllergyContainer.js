import React, { Component } from "react"
import { connect } from "react-redux"
import AllergiesList from '../../views/meal/allergy/AllergiesList'
import EditAllergy from '../../views/meal/allergy/EditAllergy'
import { getAllergiesAvailable, deleteAllergy, updateAllergy, addAllergy} from '../../actions'
import { confirmPopupActions, modalAction} from "../../actions"
import ConfirmPopup from '../../components/ConfirmPopup'
import Modal from '../../components/Modal'

class AllergyContainer extends Component {
	constructor(props) {
        super(props)
        this.state = {
			editting: false,
            allergy: {}
		}
	}

	handleEdit = (allergy) => {
		this.setState({editting: true, allergy})
		this.props.openEditPopup()
	}

	handleCreate = () => {
		this.setState({editting: false, allergy: {}})
		this.props.openEditPopup()
	}

	handleDelete = (allergy) => {
		this.setState({allergy})
		this.props.openConfirmPopup()
	}


	render() {
		let { allergies, fetchAllergies, totalRecord, totalPage, loading,
			openConfirm, onDeleteAllergy, closeConfirmPopup,
			openModal, closeEditPopup, onUpdateAllergy, onCreateAllergy} = this.props
		return (
			<div>
				<Modal open={openModal}>
					<EditAllergy 
						editting= {this.state.editting}
						allergy={this.state.allergy}
						handleClose={closeEditPopup}
						handleUpdate={onUpdateAllergy}
						hanldeAdd={onCreateAllergy}
                    />
                </Modal>
				<ConfirmPopup 
                    open={openConfirm} 
                    title='Are you sure you want to delete?'
                    description = "This allergy will be deleted from the database and don't display for later."
					handeDisagree={closeConfirmPopup}
                    handleAgree= {() => {
						closeConfirmPopup()
						onDeleteAllergy(this.state.allergy.id)
					}}
                />
				<AllergiesList
					loading={loading}
					allergies={allergies}
					totalRecord={totalRecord}
					totalPage={totalPage}
					fetchAllergies={fetchAllergies}
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
		allergies: state.allergy.allergies,
		totalRecord: state.allergy.total_record,
		totalPage: state.allergy.total_page,
		loading: state.loading.status,
		openConfirm: state.confirmPopup.open,
		openModal: state.modal.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchAllergies: (currentPage, pageSize) => {
			dispatch(getAllergiesAvailable(currentPage, pageSize))
		},
		onCreateAllergy: (allergy) => {
			dispatch(addAllergy(allergy))
		},
		onDeleteAllergy: (allergyId) => {
			dispatch(deleteAllergy(allergyId))
		},
		onUpdateAllergy: (allergy) => {
			dispatch(updateAllergy(allergy))
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

export default connect(mapStateToProps, mapDispatchToProps)(AllergyContainer)
