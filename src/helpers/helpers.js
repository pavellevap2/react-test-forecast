import * as R from "ramda";

let minToMs = (min) => min * 60000;

let checkIn = (xs, x) => R.indexOf(x, xs) == -1 ? false : true;

let filterCities = (cities, inputCity) => cities.filter(cityName => new RegExp(inputCity).test(cityName)) ;

let filter = (obj, keys) => keys.reduce((z, x) => (z[x] = obj[x], z), {});

export {checkIn,filterCities,filter, minToMs};