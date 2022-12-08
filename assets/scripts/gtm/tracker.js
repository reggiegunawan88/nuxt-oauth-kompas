// Add something here if you wanna import more tracker
import { authEventList } from './authEventList'
import { accountEventList } from './accountEventList'
import { globalEventList } from './globalEventList'
import { qrcodeEventList } from './qrcodeEventList'
import { onboardingEventList } from './onboardingEventList'

const eventList = { ...authEventList, ...accountEventList, ...globalEventList, ...qrcodeEventList, ...onboardingEventList }
// pls consider treeshaking when importing something
export const eventTracker = (event = {}) => {
  const obj = { ...eventList[event] }

  if (!Object.keys(obj).length) return

  // This is where the magic happens
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(obj)
}
