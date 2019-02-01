import { confirmPopupConstants } from "../constants"

export const confirmPopupActions = {
  open,
  close
}


function open() {
  return { type: confirmPopupConstants.OPEN, open: true }
}

function close() {
  return { type: confirmPopupConstants.CLOSE, open: false }
}
