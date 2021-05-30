import React, { useState } from "react"
import "./App.css"
import Search from "./components/Search"
import StudentCard from "./components/StudentCard"
import { getStudentsList } from "./services/studentServices"

function App() {
  const [studentData, setStudentData] = useState(null)
  const [searchData, setSearchData] = useState(null)
  const [nameQuery, setNameQuery] = useState(null)
  const [tagQuery, setTagQuery] = useState(null)

  React.useEffect(() => {
    getStudentsList().then((response) => setStudentData(response.students))
  }, [])
  React.useEffect(() => {
    if (studentData) setSearchData(studentData)
    if (tagQuery && tagQuery.length > 0 && nameQuery && nameQuery.length > 0) {
      setSearchData(
        studentData.filter(
          (item) =>
            (item.firstName.toLowerCase().includes(nameQuery) || item.lastName.toLowerCase().includes(nameQuery)) &&
            item?.tags?.toString().includes(tagQuery)
        )
      )
    } else if (nameQuery && nameQuery.length > 0) {
      setSearchData(
        studentData.filter(
          (item) => item.firstName.toLowerCase().includes(nameQuery) || item.lastName.toLowerCase().includes(nameQuery)
        )
      )
    } else if (tagQuery && tagQuery.length > 0) {
      setSearchData(
        studentData.filter((item) => {
          return item?.tags?.toString().includes(tagQuery)
        })
      )
    }
  }, [nameQuery, studentData, tagQuery])
  console.log(searchData)
  if (!searchData) return <div>Loading..</div>

  return (
    <div className='App'>
      <Search setNameQuery={setNameQuery} setTagQuery={setTagQuery} />
      {searchData.map((student) => (
        <StudentCard data={student} key={student.id} setStudentData={setStudentData} />
      ))}
    </div>
  )
}

export default App
