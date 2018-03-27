import React from 'react'
import { Link } from 'react-router-dom'
import searchImg from '../assets/images/zoom.ico'
import blackStar from '../assets/images/blackStar.png'
import redStar from '../assets/images/redStar.png'
import * as R from 'ramda'
import { checkIn } from '../helpers/helpers'
import {
  ButtonSearchCity,
  CitiesComponent,
  InputCityName,
  MainInput,
  MainComponent,
  ImgSearch,
} from './Commons'
import City from './Сity'

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

        <ButtonSearchCity className="btn_search" onClick={() => searchCities()}>
          <ImgSearch src={searchImg} alt="search" />
        </ButtonSearchCity>
      </MainInput>
      <CitiesComponent>
        <ul>
          {cityName.length
            ? filteredCities.map((city, i) => (
                <City
                  isStartComponent={true}
                  cities={cities}
                  city={city}
                  favorites={favorites}
                  i={i}
                  linkTo={`/weather/${cities[city]}`}
                  src={checkIn(favorites, String(city)) ? blackStar : redStar}
                  altImg={'star'}
                  addToFavorites={addToFavorites}
                />
              ))
            : null}
        </ul>
      </CitiesComponent>
    </MainComponent>
  )
}

export default Start
