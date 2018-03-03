let fetchCities = (cityName) => {//загружает город или список городов,при введение в поле поиска и клике на кнопку поиск
    return fetch(`http://localhost:8089/city/${cityName}`)
        .then(response => response.json())
        .catch(err => { console.log(err); return {};
        })
};
export default fetchCities;