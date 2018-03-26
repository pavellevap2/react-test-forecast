import { INPUT_CITY } from '../actions/actions'

const cityName = (city = '', action) => {
  switch (action.type) {
    case INPUT_CITY:
      return action.payload
    default:
      return city
  }
}
export default cityName
