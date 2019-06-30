const employee1 = require('./static/employee1.json')
const employee2 = require('./static/employee2.json')
const employee3 = require('./static/employee3.json')
const employee4 = require('./static/employee4.json')
const employee5 = require('./static/employee5.json')

const employee6 = require('./static/employee6.json')
const employee7 = require('./static/employee7.json')
const employee8 = require('./static/employee8.json')
const employee9 = require('./static/employee9.json')

const employees = [
  { key: 'John Hartman', data: employee1 },
  { key: 'Samad Pitt', data: employee2 },
  { key: 'Amaya Knight', data: employee3 },
  { key: 'Leanna Hogg', data: employee4 },
  { key: 'Aila Hodgson', data: employee5 },
  { key: 'Vincent Todd', data: employee6 },
  { key: 'Faye Oneill', data: employee7 },
  { key: 'Lynn Haigh', data: employee8 },
  { key: 'Nylah Riddle', data: employee9 },
]
const employeeData = () => {
  const obj = {}
  employees.map(v => {
    obj[v.key.replace(' ', '%20')] = v.data
  })
  return obj
}
module.exports = () => {
  const data = {
    employees: employees.map(v => v.key),
    ...employeeData(),
  }
  return data
}
