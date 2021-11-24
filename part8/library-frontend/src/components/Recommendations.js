import { RECS } from '../queries'
import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

const Recommendations = (props) => {
  const [lazy, result] = useLazyQuery(RECS)
  useEffect(() => {
    lazy()
  },[props.show]) //eslint-disable-line
  if (!props.show) {
    return null
  }
  if (!result || result.loading)  {
    return <div>loading...</div>
  }
  const books = result.data.recs.books
  return (
    <div>
      <h2>books</h2>
      <p>books in your favorite genre <b>{result.data.recs.user.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations