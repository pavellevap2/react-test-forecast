import Start from '../components/Start/Start'
import { connect } from 'react-redux'
import { getCities, getFavorites } from '../selectors/selectors'
import { citiesFetchData, addToFavorites } from '../actions/actions'

const mapStateToProps = state => ({
  cities: getCities(state),
  favorites: getFavorites(state),
})

const mapDispatchToProps = dispatch => ({
  citiesFetchData: url => dispatch(citiesFetchData(url)),
  addToFavorites: (city, cityId) => dispatch(addToFavorites(city, cityId)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Start)
