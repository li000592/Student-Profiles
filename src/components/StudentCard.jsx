import React from "react"
import "./StudentCard.css"

export default function StudentCard({ data }) {
  const [isExpand, setIsExpand] = React.useState(false)
  const averageGrade = (
    data.grades.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue)) /
    (data.grades.length + 1)
  ).toFixed(3)
  const toggleButtonHandler = () => {
    setIsExpand((state) => !state)
  }
  return (
    <div className='student-card'>
      <img src={data.pic} alt='student-avatar' className='student-avatar' />
      <div className='right-contents'>
        <h1>
          {data.firstName} {data.lastName}
        </h1>
        <p>
          <b>Email :</b> {data.email}
        </p>
        <p>
          <b>Company :</b> {data.company}
        </p>
        <p>
          <b>Skill :</b> {data.skill}
        </p>
        <p>
          <b>Average :</b> {averageGrade}%
        </p>
        {isExpand ? (
          <div>
            {data.grades.map((grades, index) => (
              <p>
                <b>Test {index + 1}:</b> {grades}
              </p>
            ))}
          </div>
        ) : null}
      </div>
      <div className='button-container'>
        <button className='toggle-buttons' onClick={toggleButtonHandler}>
          {isExpand ? "-" : "+"}
        </button>
      </div>
    </div>
  )
}
