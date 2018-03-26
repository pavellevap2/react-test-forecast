import Favorites from '../components/Favorites/Favorites'
import { connect } from 'react-redux'
import { removeFromFavorites } from '../actions/actions'
import { getFavorites } from '../selectors/selectors'

const mapStateToProps = state => ({
  favorites: getFavorites(state),
})

const mapDispatchToProps = dispatch => ({
  removeFromFavorites: id => dispatch(removeFromFavorites(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
