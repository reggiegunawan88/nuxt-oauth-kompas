import moment from 'moment'
import { isDevice24Hrs } from './device'

// reform date -> DD-MM-YYYY (ex: 20-01-2021)
export const reformDate = (value: any) => {
  return moment(value).format('DD-M-YYYY')
}

// reform date -> DD-MM-YYYY (ex: 20-01-2021)
export const reformDateWithMonthName = (value: any) => {
  return moment(value).format('DD MMMM YYYY')
}

// reform date -> DD MMM YYYY (ex: 20 Jan 2021)
export const reformDateWithMonths = (value: any) => {
  return moment(value).format('DD-MMM-YYYY').split('-').join(' ')
}

// reformed date -> DD MMMM YYYY | hh:mm (ex: 20 January 2021 | 20:30)
export const reformedDateWithTime = (value: any) => {
  return moment(value).utcOffset('GMT+7').format('DD-MMMM-YYYY | HH:mm').split('-').join(' ')
}

// format date using moment lib -> format: 'YYYY-MM-DDT00:00:00Z'
export const formatDate = (moment: any, date: string, month: string, year: string) => {
  return moment((parseInt(date) < 10 ? '0' + date.toString() : date.toString()) + '-' + (parseInt(month) < 10 ? '0' + month.toString() : month.toString()) + '-' + year, 'DD-MM-YYYY').format(
    'YYYY-MM-DDT00:00:00Z',
  )
}

// convert UNIX to date
export const convertUNIXDate = (unix: string) => {
  const deviceDate: any = new Date(parseInt(unix) * 1000)
  // untuk keperluan inteval
  const seconds: any = Math.floor(((new Date() as any) - deviceDate) / 1000)

  if (isDevice24Hrs(unix)) {
    // > 24 hrs, format DD MMM YYYY, HH:mm
    return moment(deviceDate).format('DD MMM YYYY, HH:mm')
  } else {
    // < 24 hrs, format x menit lalu & x jam lalu
    // untuk menampilkan x hari lalu
    let interval = seconds / 86400
    if (interval > 1) {
      return Math.floor(interval) + ' hari lalu'
    }
    // untuk menampilkan x jam lalu
    interval = seconds / 3600
    if (interval > 1) {
      return Math.floor(interval) + ' jam lalu'
    }
    // untuk menampilkan x menit lalu
    interval = seconds / 60
    if (interval > 1) {
      return Math.floor(interval) + ' menit lalu'
    }
    // untuk menampilkan dibawah 1 detik lalu
    if (seconds < 1) {
      return '1 detik lalu'
    }
    // untuk menampilkan x detik lalu
    return Math.floor(seconds) + ' detik lalu'
  }
}

export const formatArticleDate = (dateData: any) => {
  const date: any = new Date(dateData)
  // untuk keperluan inteval
  const seconds: any = Math.floor(((new Date() as any) - date) / 1000)

  // format x menit lalu & x jam lalu
  // untuk menampilkan DD MMM YYYY
  let interval = seconds / 86400
  if (interval > 1) {
    return moment(dateData).format('DD MMM YYYY')
  }
  // untuk menampilkan x hari lalu
  if (interval === 1) {
    return Math.floor(interval) + ' hari lalu'
  }
  // untuk menampilkan x jam lalu
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' jam lalu'
  }
  // untuk menampilkan x menit lalu
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' menit lalu'
  }
  // untuk menampilkan dibawah 1 detik lalu
  if (seconds < 1) {
    return '1 detik lalu'
  }
  // untuk menampilkan x detik lalu
  return Math.floor(seconds) + ' detik lalu'
}
