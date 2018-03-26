import { connect } from 'react-redux'
import { getForecast } from '../selectors/selectors'
import Forecast from '../components/Forecast/Forecast'
import { forecastFetchData } from '../actions/actions'

const mapStateToProps = state => ({
  forecast: getForecast(state),
})

const mapDispatchToProps = dispatch => ({
  forecastFetchData: cityId => dispatch(forecastFetchData(cityId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Forecast)
