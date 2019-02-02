import { loadingConstants } from "../constants"

export const loadingActions = {
  loading,
  requesting,
  done,
  requestDone
}

function loading() {
  return { type: loadingConstants.LOADING }
}

function done() {
  return { type: loadingConstants.DONE }
}

function requesting() {
  return { type: loadingConstants.REQUESTING }
}

function requestDone() {
  return { type: loadingConstants.REQUEST_DONE }
}