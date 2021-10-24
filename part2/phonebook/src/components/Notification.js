import React from "react"

const Notification = ({message, errorMessage}) => {
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
    
    if (message === null) {
      return null
    }

    if (message.includes('already deleted') || message.includes('shorter')){
        return (
        <div style={errorStyle}>
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