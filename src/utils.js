const dateToInputFormat = (date) => {
  const year = date.getFullYear()
  const monthNumber = date.getMonth() + 1 // returns month index, so + 1
  const month = monthNumber > 9 ? monthNumber : '0'.concat(monthNumber)
  const day = date.getDate() > 9 ? date.getDate() : '0'.concat(date.getDate())
  return `${year}-${month}-${day}`
}

export {
  dateToInputFormat
}