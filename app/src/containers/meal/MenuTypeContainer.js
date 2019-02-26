import React, { Component } from "react"
import { connect } from "react-redux"
import MenuTypeList from '../../views/meal/menuType/MenuTypeList'
import { getMenusAvailable, deleteMenu, updateMenu, addMenu} from '../../actions'
import { confirmPopupActions, modalAction } from "../../actions"
import Modal from '../../components/Modal'
import EditMenuType from '../../views/meal/menuType/EditMenuType'
import ConfirmPopup from '../../components/ConfirmPopup'

class MenuTypeContainer extends Component {
	constructor(props) {
        super(props)
        this.state = {
			editting: false,
            menu: {}
		}
	}

	handleEdit = (menu) => {
		this.setState({editting: true, menu})
		this.props.openEditPopup()
	}

	handleCreate = () => {
		this.setState({editting: false, menu: {}})
		this.props.openEditPopup()
	}

	handleDelete = (menu) => {
		this.setState({menu})
		this.props.openConfirmPopup()
	}

	render() {
		let {menus, fetchMenus, totalRecord, totalPage, loading,
			openConfirm, onDeleteMenu, closeConfirmPopup,
			openModal, closeEditPopup, onUpdateMenu, onCreateMenu} = this.props

		return (
			<div>
				<Modal open={openModal}>
					<EditMenuType 
						editting= {this.state.editting}
						menu={this.state.menu}
						handleClose={closeEditPopup}
						handleUpdate={onUpdateMenu}
						hanldeAdd={onCreateMenu}
                    />
                </Modal>
				<ConfirmPopup 
                    open={openConfirm} 
                    title='Are you sure you want to delete this menu type?'
                    description = "This menu type will be deleted from the database and don't display for later."
                    handeDisagree={closeConfirmPopup}
                    handleAgree= {() => {
						closeConfirmPopup()
						onDeleteMenu(this.state.menu.id)
					}}
                />
				<MenuTypeList
					loading={loading}
					menus={menus}
					totalRecord={totalRecord}
					totalPage={totalPage}
					fetchMenus={fetchMenus}
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
		menus: state.menu.menus,
		totalRecord: state.menu.total_record,
		totalPage: state.menu.total_page,
		loading: state.loading.status,
		openConfirm: state.confirmPopup.open,
		openModal: state.modal.status
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchMenus: (currentPage, pageSize) => {
			dispatch(getMenusAvailable(currentPage, pageSize))
		},
		onCreateMenu: (menu) => {
			dispatch(addMenu(menu))
		},
		onDeleteMenu: (menuId) => {
			dispatch(deleteMenu(menuId))
		},
		onUpdateMenu: (menu) => {
			dispatch(updateMenu(menu))
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuTypeContainer)
