import React from 'react'
const log = console.log
const Search = ({ handleSearchSubmitCallback }) => {
  const handleSearchSubmit = e => {
    e.preventDefault()
    // no need state for input =)))
    const elmInputSearch = document.querySelector('#inputSearch')
    handleSearchSubmitCallback(elmInputSearch.value)
  }
  return (
    <>
      <h1 className="mb-4 text-center fz-24 fz-md-32">Employee Explorer</h1>
      <form className=" justify-content-center  form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
        <input
          className="form-control form-control-lg mr-sm-2"
          type="text"
          placeholder="Name or Tite"
          aria-label="Search"
          id="inputSearch"
        />
        <button className="btn btn-lg btn-secondary my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </>
  )
}

export default Search
