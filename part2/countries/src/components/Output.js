import React from 'react'
import Country from './Country'
import Details from './Details'

const Output = (props) => {
    if (props.countries.length>10){
        return(
            <p>Too many matches, specify another filter</p>
        )
    }
    if (props.countries.length===1){
        return(
            <Details country={props.countries[0]} weather={props.weather}/>
        )
    }
    if (props.showSelected){
        return(
            <Details country={props.selected} weather={props.weather}/>
        )
    }
    return (
        <div>
            {props.countries.map(country => 
                <Country 
                    key={country.name.common}
                    country={country}
                    showDetails={props.showDetails}
                />
            )}
        </div>
    )
}

export default Output