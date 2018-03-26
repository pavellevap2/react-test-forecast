import * as R from 'ramda'

export const LOAD_CITIES = '@@ROOT/START/LOAD_CITIES'
export const MAKE_FAVORITE = '@@ROOT/START/MAKE_FAVORITE'
export const REMOVE_FROM_FAVORITES = '@@ROOT/START/'
export const LOAD_FORECAST = '@@ROOT/START/FORECAST/'
export const INPUT_CITY = '@@/ROOT/START/INPUT'
export const INPUT_FAVORITE_CITY = '@@/ROOT/FAVORITES/INPUT'
export const LOAD_FAVORITES = '@@/ROOT/FAVORITES/LOAD_FAVORITES'

export const inputCity = cityName => ({ type: INPUT_CITY, payload: cityName })

export const inputFavoriteCity = cityName => ({
  type: INPUT_FAVORITE_CITY,
  payload: cityName,
})

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
  const favorites = JSON.parse(localStorage.getItem('favorites'))
  localStorage.setItem(
    'favorites',
    JSON.stringify({ ...favorites, [city]: cityId }),
  )

  return { type: MAKE_FAVORITE, payload: { city, cityId } }
}

export const removeFromFavorites = favoriteName => {
  const favorites = JSON.parse(localStorage.getItem('favorites'))
  localStorage.setItem(
    'favorites',
    JSON.stringify(R.dissoc(favorites, favorites)),
  )

  return { type: REMOVE_FROM_FAVORITES, payload: favoriteName }
}

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

export const loadFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites'))

  return {
    type: LOAD_FAVORITES,
    payload: favorites,
  }
}
