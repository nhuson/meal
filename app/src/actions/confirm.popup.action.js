import { confirmPopupConstants } from "../constants"

export const confirmPopupActions = {
  disagree,
  agree,
  open
}

function disagree() {
  return { type: confirmPopupConstants.DISAGREE, open: false }
}

function agree() {
  return { type: confirmPopupConstants.AGREE, open: false }
}

function open() {
    return { type: confirmPopupConstants.OPEN, open: true }
  }
