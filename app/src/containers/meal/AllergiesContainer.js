import React, { Component } from "react"
import { connect } from "react-redux"
import AllergiesList from '../../views/meal/AllergiesList'
import { getAllergiesAvailable} from '../../actions'
import { confirmPopupActions } from "../../actions"

class AllergiesContainer extends Component {
	render() {
		let { allergies, fetchAllergies, totalRecord, totalPage, loading,
			handleDelete, openConfirmPopup, handlePopupDisagree, handlePopupAgree } = this.props
		return (
			<div>
				<AllergiesList
					loading={loading}
					allergies={allergies}
					totalRecord={totalRecord}
					totalPage={totalPage}
					fetchAllergies={fetchAllergies}
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
		allergies: state.allergy.allergies,
		totalRecord: state.allergy.total_record,
		totalPage: state.allergy.total_page,
		loading: state.loading.status,
		openConfirmPopup: state.confirmPopup.open
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchAllergies: (currentPage, pageSize) => {
			dispatch(getAllergiesAvailable(currentPage, pageSize))
		},
		handleDelete: () => {
			dispatch(confirmPopupActions.open())
		},
		handlePopupDisagree: () => {
			dispatch(confirmPopupActions.disagree())
		},
		handlePopupAgree: () => {
			dispatch(confirmPopupActions.agree())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllergiesContainer)
