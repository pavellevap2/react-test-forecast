import { INPUT_FAVORITE_CITY } from '../actions/actions'

const favoriteCityName = (favoriteCity = '', action) => {
  switch (action.type) {
    case INPUT_FAVORITE_CITY:
      return action.payload
    default:
      return favoriteCity
  }
}
export default favoriteCityName
