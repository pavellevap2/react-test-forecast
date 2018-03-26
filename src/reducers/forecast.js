import { LOAD_FORECAST } from '../actions/actions'

const forecast = (forecast = { weather: [], location: '' }, action) => {
  switch (action.type) {
    case LOAD_FORECAST:
      return action.payload
    default:
      return forecast
  }
}
export default forecast
