import { ALL_BOOKS } from '../queries'
import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'

const Books = (props) => {
  const [filterValue, setFilterValue] = useState('all genres')
  const initial = useQuery(ALL_BOOKS)
  const [lazyQ, lazyRes] = useLazyQuery(ALL_BOOKS)
  /*const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: filterValue==='all genres' ? null : filterValue
    }
  })*/
  useEffect(() => {
    lazyQ({ variables: { genre: filterValue==='all genres' ? null : filterValue } })
  },[filterValue]) //eslint-disable-line
  if (!props.show) {
    return null
  }
  if (initial.loading)  {
    return <div>loading...</div>
  }
  const allBooks = initial.data.allBooks
  let gens = []
  allBooks.forEach(b => {
    b.genres.map(g => gens.push(g))
  })
  let uG = [...new Set(gens)]
  const books = lazyRes.loading ? allBooks : lazyRes.data.allBooks
  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{filterValue}</b></p>
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
      <span>
        {
          uG.map((g,i) => 
            <button onClick={() => setFilterValue(`${g}`)} key={i}>{g}</button>
          )
        }
        <button onClick={() => setFilterValue('all genres')}>all genres</button>
      </span>
    </div>
  )
}

export default Books