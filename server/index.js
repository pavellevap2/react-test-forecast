let A = require("axios");
let Cors = require("cors");
let Express = require("express");

const API_URL = "https://www.metaweather.com/api/location/:foo";

let app = Express();

app.set("port", process.env.PORT || 8081);

app.use(Cors());


app.get("/weather/:foo", (req, res, next) => {
    console.log(req.params.foo);
    A.get(API_URL)
        .then((response) => {
            console.log("GET /weather");
            res.status(200).send({data: response.data});
        })
        .catch((error) => {
            console.warn(error);
            res.status(200).send({error: error.message});
        })
        .then(next);
});

app.listen(app.get("port"), () => {
    console.log(`Listening on port ${app.get("port")}, pid ${process.pid}`)
});