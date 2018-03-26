import Start from '../components/Start'
import { connect } from 'react-redux'
import {
  getCities,
  getFavorites,
  getCity,
  getFilteredCities,
} from '../selectors/selectors'
import { addToFavorites, citiesFetchData, inputCity } from '../actions/actions'

const mapStateToProps = state => ({
  cityName: getCity(state),
  cities: getCities(state),
  filteredCities: getFilteredCities(state),
  favorites: getFavorites(state),
})

const mapDispatchToProps = dispatch => ({
  inputCity: cityName => dispatch(inputCity(cityName)),
  citiesFetchData: url => dispatch(citiesFetchData(url)),
  addToFavorites: (city, cityId) => dispatch(addToFavorites(city, cityId)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Start)
