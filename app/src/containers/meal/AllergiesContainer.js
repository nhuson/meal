import React, { Component } from "react"
import { connect } from "react-redux"
import AllergiesList from '../../views/meal/AllergiesList'
import { getAllergiesAvailable} from '../../actions'

class AllergiesContainer extends Component {
	render() {
		let { allergies, fetchAllergies, totalRecord, totalPage, loading } = this.props
		return (
			<div>
				<AllergiesList
					loading={loading}
					allergies={allergies}
					totalRecord={totalRecord}
					totalPage={totalPage}
					fetchAllergies={fetchAllergies}
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
		loading: state.loading.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchAllergies: (currentPage, pageSize) => {
			dispatch(getAllergiesAvailable(currentPage, pageSize))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllergiesContainer)
