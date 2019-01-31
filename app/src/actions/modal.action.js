import { modalConstant } from '../constants'

export const modalAction = {
	openModal: () => {
		return { type: modalConstant.OPEN_MODAL, status: true }
	},

	closeModal: () => {
		return { type: modalConstant.CLOSE_MODAL, status: false }
	}
}