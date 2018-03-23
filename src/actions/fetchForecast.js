const fetchForecast = id => {
  //загружает прогноз погоды при клике на выбранный город

  return fetch(`/api/location/${id}`)
    .then(response => response.json())
    .then(data => (console.log('data', data), data))

    .catch(err => {
      console.log(err)
      return {}
    })
}
export default fetchForecast
