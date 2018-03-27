import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledHeader = styled.header`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 11vh;
  margin-top: -1%;
  background-color: black;
`
const NavList = styled.ul`
  padding: 2.5vh 0 2vh 0;
  display: flex;
  flex-direction: row;
  margin-left: 15%;
`
const NavItem = styled.li`
  &:first-child {
    margin-right: 5%;
  }
`

const Link = styled(NavLink)`
  color: white;
  font-size: 39px;
  font-weight: bold;

  &.active {
    transition: 0.9s;
    padding-bottom: 4px;
    color: red;
    border-bottom: 3px solid red;
    text-decoration: red;
  }
`

const Header = () => {
  return (
    <StyledHeader>
      <NavList>
        <NavItem>
          <Link exact to="/">
            Search
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/favorites">Favorites</Link>
        </NavItem>
      </NavList>
    </StyledHeader>
  )
}
export default Header
