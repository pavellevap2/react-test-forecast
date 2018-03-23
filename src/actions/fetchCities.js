const fetchCities = cityName => {
  //загружает город или список городов,при введение города или его части в поле поиска и клике на кнопку поиск
  return fetch(`/api/location/search/?query=${cityName}`)
    .then(response => response.json())
    .catch(err => {
      console.log(err)
      return {}
    })
}
export default fetchCities
