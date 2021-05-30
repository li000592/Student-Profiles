import React from "react"
import "./Search.css"
import searchIcon from "../assets/searchIcon.svg"

export default function Search({ setNameQuery, setTagQuery }) {
  const searchNameInput = React.useRef(null)
  const searchTagInput = React.useRef(null)
  const searchNameOnChangedHandler = () => {
    setNameQuery(searchNameInput.current.value.toLowerCase())
  }
  const searchTagOnChangedHandler = () => {
    setTagQuery(searchTagInput.current.value.toLowerCase())
  }

  return (
    <div className='search-container'>
      <form className='search'>
        <input
          className='searchInput'
          type='text'
          name='searchCountry'
          placeholder='Search by Name'
          onChange={searchNameOnChangedHandler}
          ref={searchNameInput}
        />
        <img src={searchIcon} className='searchIcon' alt='searchIcon' />
      </form>
      <form className='search'>
        <input
          className='searchInput'
          type='text'
          name='searchCountry'
          placeholder='Search by Tag'
          onChange={searchTagOnChangedHandler}
          ref={searchTagInput}
        />
        <img src={searchIcon} className='searchIcon' alt='searchIcon' />
      </form>
    </div>
  )
}
