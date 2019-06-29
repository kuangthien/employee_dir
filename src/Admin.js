import React, { useEffect, useState } from 'react'
import './Admin.css'
import axios from 'axios'
import { API_URL } from './config'
import Search from './Search'
const log = console.log

const Admin = () => {
  const [employeeData, setEmployeeData] = useState(null)
  useEffect(() => {
    axios.get(API_URL + 'employees/').then(v => {
      setEmployeeData(v && v.data)
    })
  }, [])
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
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">
                Disabled
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="dropdown01"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdown01">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <main role="main" className="container">
        <div className="starter-template">
          <Search />
          {employeeData ? (
            <div className="text-left">
              <pre>{JSON.stringify(employeeData, null, 2)}</pre>
            </div>
          ) : (
            'Loading'
          )}
        </div>
      </main>
      {/* /.container */}
    </div>
  )
}

export default Admin
