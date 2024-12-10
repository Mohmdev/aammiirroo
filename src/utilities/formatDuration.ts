export const formatDuration = (seconds: number): string => {
  if (seconds >= 3600) {
    // HH:MM:SS
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    const formattedHours = hours.toString()
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  } else {
    // MM:SS
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    const formattedMinutes = minutes.toString()
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}`
  }
}
