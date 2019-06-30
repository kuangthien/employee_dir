import axios from 'axios'
import { API_URL } from './config'
let countFetch = 0

const dataBucket = {}
const fromApiToBucketEmployees = (name, data) => {
  const directSubordinates = (() => {
    if (data && data[1]) {
      return [...data[1]['direct-subordinates']]
    } else {
      return []
    }
  })()
  return {
    [name]: {
      title: data && data[0],
      directSubordinates,
    },
  }
}
const getArSub = async parent => {
  if (!parent) return
  const { directSubordinates } = Object.values(parent)[0] || {}
  if (!directSubordinates) return
  if (!Object.keys(dataBucket)[0]) {
    // root
    dataBucket[Object.keys(parent)[0]] = Object.values(parent)[0]
  }

  const arrPromise = directSubordinates.map(async v => {
    if (!dataBucket[v] && dataBucket[v] !== 'LOADING') {
      dataBucket[v] = 'LOADING'
      const { data: fetchedEmployee } = await axios.get(API_URL + 'employees/' + v)
      dataBucket[v] = fromApiToBucketEmployees(v, fetchedEmployee)[v]
      await getArSub({
        ...fromApiToBucketEmployees(v, fetchedEmployee),
      })
    }
  })
  await Promise.all(arrPromise)

  return dataBucket
}
export { fromApiToBucketEmployees, getArSub }
