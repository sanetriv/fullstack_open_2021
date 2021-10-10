import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/all'
const api_key = process.env.REACT_APP_API_KEY

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getWeather = (city) => {
    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no`
    const request = axios.get(weatherUrl)
    return request.then(response => response.data)
}

export default { getAll, getWeather }