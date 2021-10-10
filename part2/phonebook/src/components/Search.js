import React from "react"

const Search = (props) => {
    return (
        <div>
          filter shown with <input value={props.newSearch} onChange={props.handleSearchChange}/>
        </div>
    )
}

export default Search