/**
 * Reformat and Sort Ascending Country Code Data
 * @param listCountryCode Country Code Data
 * @returns Array
 */
export const formatPhoneNumberData = (listCountryCode: Array<any>) => {
  const formatData = listCountryCode
    .map((e: any) => {
      return {
        ...e,
        value: e.id.replace(/[^a-zA-Z0-9 ]/g, ''),
      }
    })
    .sort((f, g) => f.value - g.value)
    // Remove Duplicate phone code
    .filter(({ value }, index, self) => index === self.findIndex((arr) => arr.value === value))

  return formatData
}

/**
 * Separate Phone Number and Phone Code
 * @param pNum Phone Number
 * @param listCountryCode Country Code Data
 * @returns Object Contains countryCode and phoneNumber
 */
export const separatePhoneNumberData = (pNum: string, listCountryCode: Array<any>) => {
  const countryCodeData = listCountryCode.map((phone: any) => phone.value)
  let countryCode = ''
  let phoneNumber = pNum.replace(/^0/, '')

  countryCodeData.find((code: any) => {
    if (pNum.indexOf(code) === 0) {
      countryCode = code
      phoneNumber = pNum.replace(code, '')
    }
  })

  return { countryCode, phoneNumber }
}

/**
 * Trim leading zero for phone number
 * @param pNum phone number input
 */
export const trimLeadingZero = (pNum: string) => {
  return pNum.replace(/^0+/, '')
}

/**
 * Trim leading '+' for country code
 * @param code country code input
 */
export const trimCountryCode = (code: string) => {
  return code.replace('+', '')
}
