import React from 'react'
import Person from './Person'

const Output = (props) => {
    return (
        <div>
            {props.people.map(person => 
                <Person 
                    key={person.name}
                    person={person}
                    deletePerson={props.deletePerson}
                />
            )}
        </div>
    )
}

export default Output