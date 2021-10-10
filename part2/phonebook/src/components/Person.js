import React from 'react'

const Person = (props) => {
    return(
        <div>
            {props.person.name} {props.person.number}  
            <button onClick={()=>props.deletePerson(props.person.id)}>delete</button>
        </div>
    )
}
//<form onSubmit={()=>props.deletePerson(props.person.id)}>
//<p key={props.person.name}>{props.person.name} {props.person.number}</p>
export default Person