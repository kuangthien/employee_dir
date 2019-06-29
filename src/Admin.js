import React, { useEffect, useState } from 'react'
import './Admin.css'
import axios from 'axios'
import { API_URL } from './config'
import Search from './Search'
import Result from './Result'

const log = console.log

const Admin = () => {
  const [employeeData, setEmployeeData] = useState(null)
  useEffect(() => {
    axios
      .get(API_URL + 'employees')
      .then(v => {
        setEmployeeData(v && v.data)
      })
      .catch(err => {})
  }, [])
  const handleSearchSubmit = keyword => {
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
        <a className="navbar-brand" href="#">
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
      <main role="main" className="container">
        <div className="starter-template">
          <Search handleSearchSubmitCallback={handleSearchSubmit} />
          <Result employeeData={employeeData} />
        </div>
      </main>
      {/* /.container */}
    </div>
  )
}

export default Admin
