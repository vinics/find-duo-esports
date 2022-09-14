export function convertHourStringToMinutes (hourString: string) {
  const [hours, minutes] = hourString.split(':').map(Number)

  return hours * 60 + minutes 
}

export function convertMinutesToHourString (minutesAmount: number) {
  const hours = Math.floor(minutesAmount / 60)
  const minutes = minutesAmount % 60

  return formatStringTime(hours, minutes)
}

export function formatStringTime(hours: number, minutes: number) {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}
