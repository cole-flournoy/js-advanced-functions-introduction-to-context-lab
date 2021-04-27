// Your code here
function createEmployeeRecord(employeeArray){
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(emplArrays){
  return emplArrays.map(r => createEmployeeRecord(r))
}

function createTimeInEvent(record, dateTimeString){
  const date = dateTimeString.split(" ")[0]
  const time = dateTimeString.split(" ")[1] 
  record.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(time),
    date: date
  })
  return record
}

function createTimeOutEvent(record, dateTimeString){
  const date = dateTimeString.split(" ")[0]
  const time = dateTimeString.split(" ")[1] 
  record.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(time),
    date: date
  })
  return record
}

function hoursWorkedOnDate(record, dateString){
  const outEvent = record.timeOutEvents.find(e => e.date === dateString)
  const inEvent = record.timeInEvents.find(e => e.date === dateString)
  return (outEvent.hour - inEvent.hour)/ 100
}

function wagesEarnedOnDate(record, dateString){
  const hours = hoursWorkedOnDate(record, dateString)
  return hours * record.payPerHour
}

function allWagesFor(record){
  let dates = record.timeOutEvents.map(e => e.date)
  const wageArray = dates.map(d => wagesEarnedOnDate(record, d))
  debugger
  return wageArray.reduce((total, currentValue) => total + currentValue)
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(record => record.firstName === firstName)
}

function calculatePayroll(empRecords){
  return empRecords.reduce((total, currentRecord) => total + allWagesFor(currentRecord), 0)
}
