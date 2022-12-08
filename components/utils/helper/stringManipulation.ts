// validate empty value (can be useful to validate ur variable)
export const validateEmptyValue = (value: any) => {
  return value === '' || value === null || value === undefined
}

// validate email format
export const validateEmailFormat = (value: string) => {
  // eslint-disable-next-line max-len
  const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  // return false if email is valid
  if (exp.test(value)) {
    return false
  }
  return true
}

// validate if phone number is greater than 13 char
export const maxPhoneNumLength = (value: any) => {
  return value.length > 13
}
// validate if phone number is lower than 6 char
export const minPhoneNumLength = (value: any, minLenght: number = 6) => {
  return value.length > 0 && value.length < minLenght
}

// detect special char inside a string
export const detectSpecialChar = (value: any) => {
  const specialChar = /[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi
  if (specialChar.test(value)) {
    return true
  }
  return false
}

// check if string contains word
export const containsWord = (value: string) => {
  const regex = /[a-zA-Z]/g
  if (regex.test(value)) {
    return true
  }
  return false
}

// capitalizing string
export const capitalizeFirstCharacter = (letter: string) => {
  return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase()
}

// capitalize all word in a letter
export const capitalizeAllFirstCharacter = (letter: string) => {
  return letter.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase())
}

// Maksimum char
export const maximumChar = (val: string, max: number) => {
  let result = val
  if (val.length > max) {
    result = val.substr(0, max)
  }
  return result
}
