export const LOAD_CITIES = '@@ROOT/START/LOAD_CITIES'
export const MAKE_FAVORITE = '@@ROOT/START/MAKE_FAVORITE'
export const REMOVE_FROM_FAVORITE = '@@ROOT/START/'
export const LOAD_FORECAST = '@@ROOT/START/FORECAST/'

const loadCities = cities => ({ type: LOAD_CITIES, payload: cities })

export const citiesFetchData = cityName => dispatch => {
  fetch(`/api/location/search/?query=${cityName}`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    })
    .then(response => response.json())
    .then(response => {
      let cities = response.reduce((z, c) => {
        z[c.title] = c.woeid
        return z
      }, {})
      dispatch(loadCities(cities))
    })
    .catch(error => console.log(error))
}

export const addToFavorites = (city, cityId) => {
  return { type: MAKE_FAVORITE, payload: { city, cityId } }
}

export const removeFromFavorites = id => ({
  type: REMOVE_FROM_FAVORITE,
  payload: id,
})

export const loadForecast = (weather, location) => ({
  type: LOAD_FORECAST,
  payload: { weather, location },
})

export const forecastFetchData = cityId => dispatch => {
  return fetch(`/api/location/${cityId}/`)
    .then(response => response.json())
    .then(data => {
      const location = data.title
      console.log(location)
      const weather = data.consolidated_weather

      dispatch(loadForecast(weather, location))
    })
    .catch(err => console.log(err))
}
