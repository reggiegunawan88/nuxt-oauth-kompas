import DeviceDetector from 'device-detector-js'
import { trimCountryCode, trimLeadingZero } from './phoneCodeManipulation'

// get device name or model
export const getDeviceName = () => {
  const deviceDetector = new DeviceDetector()
  // get device user agent
  const userAgent = navigator.userAgent
  // parse user agent
  const result: any = deviceDetector.parse(userAgent)
  const deviceName = result.device.model === '' ? result.device.brand + ' ' + result.client.name : result.device.model
  const deviceOS = result.os.name === 'Mac' || result.os.name === 'Windows' ? result.os.name + 'OS' : result.os.name
  return `(${deviceOS}) ${deviceName}`
}

// get device type
export const getDeviceType = () => {
  const deviceDetector = new DeviceDetector()
  const userAgent = navigator.userAgent
  const result: any = deviceDetector.parse(userAgent)
  if (result.device.type === '') {
    return 'smartphone'
  } else {
    return result.device.type
  }
}

// detect if device unix is older than 24 hrs
export const isDevice24Hrs = (unix: string) => {
  // today timestamp
  const timestampToday = Math.round(new Date().getTime() / 1000)
  const timestamp24hrs = 60 * 60 * 24 * 1000

  const deviceDate = new Date(parseInt(unix) * 1000) // convert device unix to date
  const currentDate = new Date(timestampToday * 1000) // convert today timestamp to date

  // @ts-ignore
  return currentDate - deviceDate > timestamp24hrs
}

// store country code and phone num into universal storage
export const storePhoneNum = (storage: any, countryCode: string, phoneNum: string) => {
  storage.setUniversal('countryCode', trimCountryCode(countryCode))
  storage.setUniversal('phoneNumber', trimLeadingZero(phoneNum))
}
