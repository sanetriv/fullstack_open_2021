import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const successStyle={
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const errorStyle={
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const message = useSelector(state => state.notification)
  if (message === null) {
    return null
  }

  if (message.includes('Invalid')){
    return (
      <div style={errorStyle} className='error'>
        {message}
      </div>
    )
  }else{
    return (
      <div style={successStyle}>
        {message}
      </div>
    )
  }
}

export default Notification