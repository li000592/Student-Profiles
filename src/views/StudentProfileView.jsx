import React, { useState, useEffect } from "react"
import Search from "../components/Search"
import StudentCard from "../components/StudentCard"
import { getStudentsList } from "../services/studentServices"

export default function StudentProfileView() {
  const [studentData, setStudentData] = useState(null)
  const [searchData, setSearchData] = useState(null)
  const [nameQuery, setNameQuery] = useState(null)
  const [tagQuery, setTagQuery] = useState(null)

  useEffect(() => {
    getStudentsList().then((response) => setStudentData(response.students))
  }, [])
  useEffect(() => {
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

  if (!searchData) return <div>Loading..</div>

  return (
    <>
      <Search setNameQuery={setNameQuery} setTagQuery={setTagQuery} />
      {searchData.map((student) => (
        <StudentCard data={student} key={student.id} setStudentData={setStudentData} />
      ))}
    </>
  )
}
