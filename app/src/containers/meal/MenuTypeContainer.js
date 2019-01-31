import React, { Component } from "react"
import { connect } from "react-redux"
import MenuTypeList from '../../views/meal/MenuTypeList'
import { getMenusAvailable, deleteMenu} from '../../actions'
import { confirmPopupActions } from "../../actions"

class MenuTypeContainer extends Component {
	render() {
		let { menus, fetchMenus, totalRecord, totalPage, loading,
			handleDelete, openConfirmPopup, handlePopupDisagree, handlePopupAgree } = this.props
		return (
			<div>
				<MenuTypeList
					loading={loading}
					menus={menus}
					totalRecord={totalRecord}
					totalPage={totalPage}
					fetchMenus={fetchMenus}
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
		handleDelete: () => {
			dispatch(confirmPopupActions.open())
		},
		handlePopupDisagree: () => {
			dispatch(confirmPopupActions.disagree())
		},
		handlePopupAgree: (menuId) => {
			dispatch(confirmPopupActions.agree())
			dispatch(deleteMenu(menuId))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuTypeContainer)
