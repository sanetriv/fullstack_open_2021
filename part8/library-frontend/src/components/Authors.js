import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [born, setBorn] = useState('')
  const [option, setOption] = useState(null)

  const [ modifyAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()
    
    modifyAuthor({ variables: { name: option.value, born: parseInt(born) } })

    setOption(null)
    setBorn('')
  }
  if (!props.show) {
    return null
  }
  if (result.loading)  {
    return <div>loading...</div>
  }
  let options = []
  result.data.allAuthors.forEach(e => {
    options.push({
      value: e.name,
      label: e.name
    })
  })
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br></br>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={option}
          onChange={setOption}
          options={options}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>edit birthyear</button>
      </form>
    </div>
  )
}

export default Authors
