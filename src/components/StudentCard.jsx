import React from "react"
import "./StudentCard.css"

export default function StudentCard({ data, setStudentData }) {
  const [isExpand, setIsExpand] = React.useState(false)
  const addTagsValue = React.useRef(null)
  const averageGrade = (
    data.grades.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue)) /
    (data.grades.length + 1)
  ).toFixed(3)

  const toggleButtonHandler = () => {
    setIsExpand((state) => !state)
  }

  const addTagsHandler = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value
      const index = data.id - 1

      if (!data.hasOwnProperty("tags")) {
        setStudentData((allData) => {
          const copyArr = [...allData]
          copyArr[index] = { ...data, tags: [value] }
          return copyArr
        })
      } else {
        setStudentData((allData) => {
          if (data.tags.includes(value)) return allData
          const copyArr = [...allData]
          copyArr[index].tags = [...data.tags, value]
          return copyArr
        })
      }
    }
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
        <div className='tags-container'>
          {data.hasOwnProperty("tags") ? data.tags.map((tag) => <p key={`${data.id}-${tag}`}>{tag}</p>) : null}
        </div>

        {isExpand ? (
          <div>
            {data.grades.map((grades, index) => (
              <p key={index}>
                <b>Test {index + 1}:</b> {grades}
              </p>
            ))}
          </div>
        ) : null}
        <input placeholder='Add a Tag' onKeyDown={addTagsHandler} ref={addTagsValue}></input>
      </div>
      <div className='button-container'>
        <button className='toggle-buttons' onClick={toggleButtonHandler}>
          {isExpand ? "-" : "+"}
        </button>
      </div>
    </div>
  )
}
