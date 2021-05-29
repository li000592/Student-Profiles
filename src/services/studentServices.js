const BASIC_API = "https://api.hatchways.io/assessment/students"

export function getStudentsList() {
  return fetch(BASIC_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    return result.json()
  })
}
