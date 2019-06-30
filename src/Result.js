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

  // render when load all data success
  if (!rootEmployeeData && rootEmployeeName) {
    return <b>Not Found</b>
  } else if (!bucketEmployees[rootEmployeeName]) {
    return <b>Loading</b>
  } else {
    return (
      <div className="text-left  p-3 px-2 position-relative" style={{ background: '#efefef' }}>
        <EmployeeUi bucketEmployees={bucketEmployees} isMe={rootEmployeeName} />
      </div>
    )
  }
}
const EmployeeUi = ({ bucketEmployees, isMe }) => {
  return (
    <div className="position-relative">
      <div
        className="p-3  mb-5 shadow-sm bg-white text-left "
        style={{
          width: 'auto',
          overflow: 'hidden',
        }}>
        <table>
          <tr>
            <td valign="top">
              <div
                className="avat   rounded mr-2"
                style={{
                  height: 64,
                  width: 64,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '50%',
                  backgroundImage: `url('https://i.pravatar.cc/60?u=${isMe}@pravatar.com')`,
                }}
              />
            </td>
            <td valign="top">
              <div className="text-uppercase fz-14 font-weight-bold mb-0"> {bucketEmployees[isMe].title}</div>
              {isMe}
            </td>
          </tr>
        </table>
      </div>
      <div className="childs position-relative  ">
      <table width="100%">
          <tr>
            {bucketEmployees[isMe].directSubordinates.map(v => {
              return (
                <td valign="top">
                  <EmployeeUi bucketEmployees={bucketEmployees} isMe={v} />
                </td>
              )
            })}
          </tr>
        </table>
      </div>
    </div>
  )
}
export default Result
