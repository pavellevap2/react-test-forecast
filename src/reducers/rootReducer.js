import { combineReducers } from 'redux'
import cities from './cities'
import favorites from './favorites'
import forecast from './forecast'
import cityName from './cityName'
import favoriteCityName from './favoriteCityName'

const rootReducer = combineReducers({
  cityName,
  cities,
  favoriteCityName,
  favorites,
  forecast,
})
export default rootReducer
