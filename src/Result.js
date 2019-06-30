import React, { useEffect, useState } from 'react'

import { fromApiToBucketEmployees, getArSub } from './DataBucket'

const log = console.log

const fetchRecursiveData = async (rootEmployeeName, rootEmployeeData, callback) => {
  const rs = await getArSub({
    ...fromApiToBucketEmployees(rootEmployeeName, rootEmployeeData),
  })
  return callback(rs)
}

const Result = ({ employeeData: rootEmployeeData, name: rootEmployeeName }) => {
  // John Hartman
  const [bucketEmployees, setBucketEmployees] = useState({})
  useEffect(() => {
    fetchRecursiveData(rootEmployeeName, rootEmployeeData, fullData => {
      setBucketEmployees(fullData)
    })
  }, [rootEmployeeName, rootEmployeeData])

  if (!bucketEmployees) {
    return <b>Not found</b>
  } else {
    return (
      <div className="text-left">
        <pre>{JSON.stringify(bucketEmployees, null, 2)}</pre>
      </div>
    )
  }
}

export default Result
