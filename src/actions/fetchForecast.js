const fetchForecast = id => {
  //загружает прогноз погоды при клике на выбранный город
  return fetch(`/api/location/${id}`)
    .then(response => response.json())
    .catch(err => {
      console.log(err)
      return {}
    })
}
export default fetchForecast
