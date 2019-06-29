const employee1 = require('./static/employee1.json')
const employee2 = require('./static/employee2.json')
const employee3 = require('./static/employee3.json')
const employee4 = require('./static/employee4.json')
const employee5 = require('./static/employee5.json')
module.exports = () => {
  const data = { employee1, employee2, employee3, employee4, employee5 }

  return data
}
