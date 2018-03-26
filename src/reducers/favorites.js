import {
  MAKE_FAVORITE,
  REMOVE_FROM_FAVORITES,
  LOAD_FAVORITES,
} from '../actions/actions'
import * as R from 'ramda'

const favorites = (favorites = {}, action) => {
  switch (action.type) {
    case MAKE_FAVORITE:
      if (favorites[String(action.payload.city)]) {
        return R.dissoc(action.payload.city, favorites)
      }
      return { ...favorites, [action.payload.city]: action.payload.cityId }

    case REMOVE_FROM_FAVORITES:
      return R.dissoc(action.payload, favorites)
    case LOAD_FAVORITES:
      return action.payload
    default:
      return favorites
  }
}
export default favorites
