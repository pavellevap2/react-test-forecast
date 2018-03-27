import React from 'react'
import del from '../assets/images/delete.png'
import {
  CitiesComponent,
  MainInput,
  InputCityName,
  MainComponent,
} from './Commons'
import City from './Сity'

const Favorites = props => {
  const {
    favorites,
    removeFromFavorites,
    favoriteCity,
    inputFavorite,
    filteredFavorites,
  } = props

  return (
    <MainComponent>
      <MainInput>
        <InputCityName
          type="text"
          onChange={e => inputFavorite(e.target.value)}
          value={favoriteCity}
          placeholder="Search favorite cities"
        />
      </MainInput>
      <CitiesComponent>
        <ul>
          {filteredFavorites.map((city, i) => (
            <City
              isStartComponent={false}
              i={i}
              favorites={favorites}
              linkTo={`/weather/${favorites[city]}`}
              city={city}
              removeFromFavorites={removeFromFavorites}
              src={del}
              alt={'del'}
            />
          ))}
        </ul>
      </CitiesComponent>
    </MainComponent>
  )
}
export default Favorites
