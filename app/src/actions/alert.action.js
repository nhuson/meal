import { alertConstants } from "../constants"

export const alertActions = {
  success,
  error,
  clear
}

function success(message) {
  return { type: alertConstants.SUCCESS, message, status: true }
}

function error(message) {
  return { type: alertConstants.ERROR, message, status: true }
}

function clear() {
  return { type: alertConstants.CLEAR, status: false }
}
