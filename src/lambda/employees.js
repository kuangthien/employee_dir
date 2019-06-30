const { headers } = require('../lambda-utils.js')
const path = require('path')
const log = console.log
const db = require('../../scripts/json-server/db')

const dbData = db()

const getAll = () => dbData.employees
const getEmployeeByName = name => dbData[name]

export function handler(event, context, callback) {
  if (event.httpMethod === 'GET') {
    const { path } = event
    const trimmedPath = path.replace('/employees', '')
    if (trimmedPath === '') {
      const rs = getAll()
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(rs),
        headers,
      })
    } else {
      const queryEmployee = trimmedPath.replace('/', '')
      const rs = getEmployeeByName(queryEmployee)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(rs),
        headers,
      })
    }
  }

  return callback(null, {
    statusCode: 200,
    headers,
  })
}
