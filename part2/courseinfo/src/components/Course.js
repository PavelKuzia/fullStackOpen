const Course = ({course}) => {
  const total = course.parts.reduce((s, p) => s + p.exercises, 0)

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </>
  )
}

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => (
  <>
    {parts.map((part, i) => <Part key={i} part={part} />)}
  </>
)

export default Course