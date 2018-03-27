import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CityItem = styled.li`
  padding: 4% 0;
  border-bottom: 1px solid black;
  margin-top: 5%;
`
const CityLink = styled(Link)`
  @include text-props(black, 32px, bold, 5px);
  color: black;
  font-size: 32px;
  font-weight: bold;
  padding: 5px;
`
const ButtonAddFavorite = styled.button`
  float: right;
  position: relative;
  left: 4.5%;
  bottom: 30%;
  background-color: inherit;
  border: none;
`
const StarImg = styled.img`
  width: 50px;
  height: 50px;
`
const City = props => {
  const {
    cities,
    city,
    addToFavorites,
    removeFromFavorites,
    i,
    src,
    altImg,
    isStartComponent,
    linkTo,
  } = props

  return (
    <CityItem key={i}>
      <CityLink to={linkTo}>{city}</CityLink>
      <ButtonAddFavorite
        onClick={
          isStartComponent
            ? () => addToFavorites(city, cities[city])
            : () => removeFromFavorites(city)
        }
      >
        <StarImg alt={altImg} src={src} />
      </ButtonAddFavorite>
    </CityItem>
  )
}
export default City
