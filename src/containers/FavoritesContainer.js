import Favorites from '../components/Favorites'
import { connect } from 'react-redux'
import { removeFromFavorites, inputFavoriteCity } from '../actions/actions'
import {
  getFavorites,
  getFavorite,
  getFilteredFavorites,
} from '../selectors/selectors'

const mapStateToProps = state => ({
  favoriteCity: getFavorite(state),
  favorites: getFavorites(state),
  filteredFavorites: getFilteredFavorites(state),
})

const mapDispatchToProps = dispatch => ({
  inputFavorite: cityName => dispatch(inputFavoriteCity(cityName)),
  removeFromFavorites: favoriteName =>
    dispatch(removeFromFavorites(favoriteName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
