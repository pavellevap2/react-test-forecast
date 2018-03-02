let fetchData = (id) => {
    return fetch(`http://localhost:8089/weather/${id}`)
        .then(response => response.json())
        .catch(err => { console.log(err); return {};
        })
};
export {fetchData};