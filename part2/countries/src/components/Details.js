import React from 'react'

const Details = ({country, weather}) => {
    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p>
            <h2>Spoken languages</h2>
            <ul>
                {Object.values(country.languages).map((lang,i) => 
                    <li key={i}>{lang}</li>
                )}
            </ul>
            <img src={country.flags.png} alt='Not found'/>
            <h2>Weather in {country.capital[0]}</h2><br></br>
            <b>temperature: </b>{weather.current.temp_c} Celsius<br></br>
            <img src={weather.current.condition.icon} alt='not found'/><br></br>
            <b>wind: </b> {weather.current.wind_mph} mph direction {weather.current.wind_dir}
        </div>
    )
}

export default Details