import React, { useState } from "react"
import "./App.css"
import Search from "./components/Search"
import StudentCard from "./components/StudentCard"
import { getStudentsList } from "./services/studentServices"

function App() {
  const [studentData, setStudentData] = useState(null)
  const [searchData, setSearchData] = useState(null)
  const [query, setQuery] = useState(null)
  React.useEffect(() => {
    getStudentsList().then((response) => setStudentData(response.students))
  }, [])
  React.useEffect(() => {
    if (studentData) setSearchData(studentData)
    if (query && query.length > 0) {
      setSearchData(
        studentData.filter(
          (item) => item.firstName.toLowerCase().includes(query) || item.lastName.toLowerCase().includes(query)
        )
      )
    }
  }, [query, studentData])
  if (!searchData) return <div>Loading..</div>
  console.log("query", query)
  console.log(searchData)
  return (
    <div className='App'>
      <Search setQuery={setQuery} />
      {searchData.map((student) => (
        <StudentCard data={student} key={student.id} />
      ))}
    </div>
  )
}

export default App
