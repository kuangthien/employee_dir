import React, { useEffect, useState } from 'react'
import './Admin.css'
import axios from 'axios'
import { API_URL } from './config'
import Search from './Search'
import Result from './Result'
import './_common.scss'
const log = console.log

const Admin = () => {
  const [employeeData, setEmployeeData] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  useEffect(() => {}, [])
  const handleSearchSubmit = keyword => {
    setSearchKeyword(keyword)
    axios
      .get(API_URL + 'employees/' + keyword)
      .then(v => {
        setEmployeeData(v && v.data)
      })
      .catch(e => {
        log(e)
        setEmployeeData(null)
      })
  }
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a href="#top" className="navbar-brand">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarsExampleDefault" />
      </nav>
      <main role="main" className="">
        <div className="starter-template">
          <div className="container">
            <Search handleSearchSubmitCallback={handleSearchSubmit} />
          </div>
          {employeeData && searchKeyword && <Result employeeData={employeeData} name={searchKeyword} />}
        </div>
      </main>
      {/* /.container */}
    </div>
  )
}

export default Admin
