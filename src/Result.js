import React from 'react'

const Result = props => {
  console.log(props)
  if (!props.employeeData) {
    return <b>Not found</b>
  } else {
    return <pre>{JSON.stringify(props.employeeData)}</pre>
  }
}

export default Result
