const { headers } = require('../lambda-utils.js')
const path = require('path')
const log = console.log
const db = require('../../scripts/json-server/db')
const dbData = db()
const getAll = () => dbData.employees
const getEmployeeByName = name => {
  log(dbData[name])
  return dbData[name]
}

export function handler(event, context, callback) {
  if (event.httpMethod === 'GET') {
    const { path } = event
    log(path)
    const trimmedPath = path.replace('/.netlify/functions/employees','')
    log({ trimmedPath })
    if (trimmedPath === '') {
      const rs = getAll()
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(rs),
        headers,
      })
    } else {
      const queryEmployee = trimmedPath.replace('/', '')
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(getEmployeeByName(queryEmployee)),
        headers,
      })
    }
  }

  callback(null, {
    statusCode: 200,
    headers,
  })
}
