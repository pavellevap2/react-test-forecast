import React from 'react'
import searchImg from '../../assets/images/zoom.ico'
import * as R from 'ramda'
import City from '../City/Сity'
import { checkIn } from '../../helpers/helpers'
import blackStar from '../../assets/images/blackStar.png'
import redStar from '../../assets/images/redStar.png'

import {
  MainInput,
  MainComponent,
  CitiesComponent,
  InputCityName,
  ImgSearch,
  ButtonSearchCity,
} from '../Commons/Commons'

const Start = props => {
  const {
    cityName,
    inputCity,
    filteredCities,
    cities,
    addToFavorites,
    citiesFetchData,
  } = props

  const searchCities = () => {
    if (!filteredCities.length) {
      citiesFetchData(cityName)
    }
  }
  const favorites = R.keys(props.favorites)

  return (
    <MainComponent>
      <MainInput>
        <InputCityName
          type="text"
          placeholder="Enter a сity"
          onChange={e => inputCity(e.target.value)}
          value={cityName}
        />

        <ButtonSearchCity onClick={() => searchCities()}>
          <ImgSearch src={searchImg} alt="search" />
        </ButtonSearchCity>
      </MainInput>
      <CitiesComponent>
        <ul>
          {cityName.length
            ? filteredCities.map((city, i) => (
                <City
                  isStartComponent={true}
                  i={i}
                  city={city}
                  cities={cities}
                  linkTo={`/weather/${cities[city]}`}
                  favorites={favorites}
                  addToFavorites={addToFavorites}
                  src={checkIn(favorites, String(city)) ? blackStar : redStar}
                  altImg="star"
                />
              ))
            : null}
        </ul>
      </CitiesComponent>
    </MainComponent>
  )
}
export default Start
