import Root from '../components/Root/Root'
import { connect } from 'react-redux'
import { getFavorites } from '../selectors/selectors'
import { loadFavorites } from '../actions/actions'

const mapStateToProps = state => ({
  favorites: getFavorites(state),
})

const mapDispatchToProps = dispatch => ({
  loadFavorites: favorites => dispatch(loadFavorites(favorites)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Root)
