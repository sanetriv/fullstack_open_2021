import React from 'react'

const Country = (props) => {
    return(
        <div>
            {props.country.name.common}
            <button onClick={() => props.showDetails(props.country)}>show</button>
        </div>
    )
}

export default Country