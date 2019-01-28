import React, { Component } from "react"
import { connect } from "react-redux"
import MenuTypeList from '../../views/meal/MenuTypeList'
import { getMenusAvailable} from '../../actions'

class MenuTypeContainer extends Component {
	render() {
		let { menus, fetchMenus, totalRecord, totalPage, loading } = this.props
		return (
			<div>
				<MenuTypeList
					loading={loading}
					menus={menus}
					totalRecord={totalRecord}
					totalPage={totalPage}
					fetchMenus={fetchMenus}
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
		loading: state.loading.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchMenus: (currentPage, pageSize) => {
			dispatch(getMenusAvailable(currentPage, pageSize))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuTypeContainer)
