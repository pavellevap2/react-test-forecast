let A = require("axios");
let Cors = require("cors");
let Express = require("express");

const API_ROOT_URL = "https://www.metaweather.com/api/location/";

let app = Express();

app.set("port", process.env.PORT || 8089);

app.use(Cors());


app.get("/city/:city", (req, res, next) => {
    A.get(API_ROOT_URL + "search/", {params: {query: req.params.city}})
        .then((response) => {
            res.status(200).send({data: response.data});
        })
        .catch((error) => {
            console.warn(error);
            res.status(200).send({error: error.message});
        })
        .then(next);
});

app.get("/weather/:id", (req, res, next) => {
    A.get(API_ROOT_URL + req.params.id)
        .then((response) => {
            res.status(200).send({data: response.data});
        })
        .catch((error) => {
            console.warn(error);
            res.status(200).send({error: error.message});
        })
        .then(next);
});

app.listen(app.get("port"), () => {
    console.log(`Listening on port ${app.get("port")}, pid ${process.pid}`);
});