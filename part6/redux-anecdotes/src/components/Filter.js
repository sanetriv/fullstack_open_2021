import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    props.setFilter(filter)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name='filter' onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { filter: state.filter }
}

const mapDispatchToProps = {
  setFilter
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter