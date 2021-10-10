import React from 'react'

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.map(part=>part.exercises).reduce((s,p)=>s+p)
    return(
      <b>total of {sum} exercises</b>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(c => 
                <Part key={c.id} part={c}/>
            )}
        </div>
    )
  }

  const Course = ({course}) => {
    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
      )
  }

export default Course