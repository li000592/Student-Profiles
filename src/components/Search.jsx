import React from "react"
import "./Search.css"
import searchIcon from "../assets/searchIcon.svg"

export default function Search({ setQuery }) {
  const searchInput = React.useRef(null)
  const searchOnChangedHandler = () => {
    setQuery(searchInput.current.value.toLowerCase())
  }
  return (
    <div className='search-container'>
      <form className='search'>
        <input
          className='searchInput'
          type='text'
          name='searchCountry'
          placeholder='Search by Name'
          onChange={searchOnChangedHandler}
          ref={searchInput}
        />
        <img src={searchIcon} className='searchIcon' alt='searchIcon' />
      </form>
    </div>
  )
}
