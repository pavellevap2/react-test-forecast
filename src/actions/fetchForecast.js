let fetchForecast = (id) => {//загружает прогноз погоды при клике на выбранный город
    return fetch(`http://localhost:8089/weather/${id}`)
        .then(response => response.json())
        .catch(err => { console.log(err); return {};
        })
};
export default fetchForecast;