import { loadingConstants } from "../constants"

export const loadingActions = {
  loading,
  done
}

function loading() {
  return { type: loadingConstants.LOADING }
}

function done() {
  return { type: loadingConstants.DONE }
}

