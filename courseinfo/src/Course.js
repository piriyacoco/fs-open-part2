const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(item => <Part part={item} key={item.id}/>)}
  </>

const Course = (props) => {
  const {id, name, parts} = props.course
  return (
    <div>
    <Header course={name} />
    <Content parts={parts} />
    <Total sum={parts.reduce((total, currentValue) => total = total + currentValue.exercises, 0)}/>
    </div> 
    )
}

export default Course