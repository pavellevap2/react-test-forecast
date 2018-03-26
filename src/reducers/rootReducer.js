import { combineReducers } from 'redux'
import cities from './cities'
import favorites from './favorites'
import forecast from './forecast'

const rootReducer = combineReducers({
  cities,
  favorites,
  forecast,
})
export default rootReducer
