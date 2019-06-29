import React from 'react'

const Search = () => {
  return (
    <>
      <h1 className="mb-4">Employee Explorer</h1>
      <form className=" justify-content-center  form-inline my-2 my-lg-0">
        <input
          className="form-control form-control-lg mr-sm-2"
          type="text"
          placeholder="Name or Tite"
          aria-label="Search"
        />
        <button className="btn btn-lg btn-secondary my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </>
  )
}

export default Search
