import axios from 'axios'
import { useEffect, useState } from 'react'

interface WeatheForecast {
  date: string
  temperatureC: Celsius
  temperatureF: Fahrenheit
  summary?: string
}

const getWeatherData = async () => {
  const response = await axios.get<readonly WeatheForecast[]>('api/weatherforecast')
  return response.data
}

const ForecastsTable = ({ forecasts }: { forecasts: readonly WeatheForecast[] }) =>
  <table className="table table-striped" aria-labelledby="tableLabel">
    <thead>
      <tr>
        <th>Date</th>
        <th>Temp. (C)</th>
        <th>Temp. (F)</th>
        <th>Summary</th>
      </tr>
    </thead>
    <tbody>
      {forecasts.map(forecast => <tr key={forecast.date}>
        <td>{forecast.date}</td>
        <td>{forecast.temperatureC}</td>
        <td>{forecast.temperatureF}</td>
        <td>{forecast.summary}</td>
      </tr>
      )}
    </tbody>
  </table>


export const FetchData = () => {

  const [forecasts, setForecasts] = useState<readonly WeatheForecast[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() =>
    void getWeatherData()
      .then(data => {
        setForecasts(data)
        setLoading(false)
      }), [])

  return (
    <div>
      <h1 id="tableLabel">Weather forecast</h1>
      <p>This component demonstrates fetching data from the server.</p>
      {
        loading
          ? <p><em>Loading...</em></p>
          : <ForecastsTable forecasts={forecasts} />
      }
    </div>
  )
}
