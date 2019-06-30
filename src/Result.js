import React, { useEffect, useState, useLayoutEffect } from 'react'

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
      <>
        <div className=" w-100  p-3 px-2 position-relative  " style={{ overflow: 'auto', background: '#efefef' }}>
          <EmployeeUi bucketEmployees={bucketEmployees} isMe={rootEmployeeName} />
        </div>
      </>
    )
  }
}
const EmployeeUi = ({ bucketEmployees, isMe }) => {
  const { directSubordinates } = bucketEmployees[isMe]
  const isALeaf = directSubordinates && directSubordinates.length <= 0
  return (
    <div className="position-relative text-center">
      <div
        className={`p-3 d-inline-block mb-5 shadow-sm bg-white text-left ${isALeaf && 'isALeaf'}`}
        style={{
          width: 220,
          overflow: 'hidden',
        }}>
        {isALeaf && (
          <style>{`
        [id="td-${isMe}"]  {
          display:block
        }
        .isALeaf{margin-bottom: 0!important}
        `}</style>
        )}
        <table>
          <tbody>
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
          </tbody>
        </table>
      </div>
      <div className="childs position-relative  ">
        <table width="100%">
          <tbody>
            <tr>
              {bucketEmployees[isMe].directSubordinates.map(v => {
                return (
                  <td valign="top" id={`td-${v}`} key={v}>
                    <EmployeeUi bucketEmployees={bucketEmployees} isMe={v} />
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Result
