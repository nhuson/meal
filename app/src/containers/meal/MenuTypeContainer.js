import React, { Component } from "react"
import { connect } from "react-redux"
import MenuTypeList from '../../views/meal/MenuTypeList'
import { getMenusAvailable} from '../../actions'
import { confirmPopupActions } from "../../actions"

class MenuTypeContainer extends Component {
	render() {
		let { menus, fetchMenus, totalRecord, totalPage, loading,
			handleDeleteContact, openConfirmPopup, handlePopupDisagree, handlePopupAgree } = this.props
		return (
			<div>
				<MenuTypeList
					loading={loading}
					menus={menus}
					totalRecord={totalRecord}
					totalPage={totalPage}
					fetchMenus={fetchMenus}
					handleDelete={handleDeleteContact}
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
		menus: state.menu.menus,
		totalRecord: state.menu.total_record,
		totalPage: state.menu.total_page,
		loading: state.loading.status,
		openConfirmPopup: state.confirmPopup.open
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchMenus: (currentPage, pageSize) => {
			dispatch(getMenusAvailable(currentPage, pageSize))
		},
		handleDeleteContact: () => {
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuTypeContainer)
