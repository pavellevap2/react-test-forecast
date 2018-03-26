import { LOAD_CITIES } from '../actions/actions'

const cities = (cities = {}, action) => {
  switch (action.type) {
    case LOAD_CITIES:
      return action.payload
    default:
      return cities
  }
}
export default cities
