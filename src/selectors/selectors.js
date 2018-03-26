import * as R from 'ramda'

const filterCities = (cities, inputCity) =>
  cities.filter(cityName => new RegExp(inputCity).test(cityName))

export const getCity = state => state.cityName

export const getCities = state => state.cities

export const getFavorite = state => state.favoriteCityName

export const getFavorites = state => state.favorites

export const getForecast = state => state.forecast

export const getFilteredCities = state => {
  const cities = getCities(state)
  const cityName = getCity(state)
  const availableCities = R.keys(cities)

  return filterCities(availableCities, cityName)
}

export const getFilteredFavorites = state => {
  const favorite = getFavorite(state)
  const favorites = getFavorites(state)

  const availableFavorites = R.keys(favorites)
  return filterCities(availableFavorites, favorite)
}
