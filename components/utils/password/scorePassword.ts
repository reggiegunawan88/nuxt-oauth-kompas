const scorePassword = (pass: string) => {
  let score = 0

  const specialCharRegex = /[^A-Za-z0-9]/g
  const lowercaseRegex = /(.*[a-z].*)/g
  const uppercaseRegex = /(.*[A-Z].*)/g
  const numberRegex = /(.*[0-9].*)/g
  // const repeatCharRegex = /(\w)(\1+\1+\1+\1+)/g

  const hasSpecialChar = specialCharRegex.test(pass) // abc123
  const hasLowerCase = lowercaseRegex.test(pass)
  const hasUpperCase = uppercaseRegex.test(pass)
  const hasNumber = numberRegex.test(pass)

  if (pass.length < 1) {
    score = 0
  } else if (pass.length >= 1 && pass.length < 6) {
    // all combinations below 6 char -> weak
    score = 1
  } else if (pass.length >= 6 && pass.length < 8) {
    // weak
    if (hasLowerCase || hasUpperCase || hasNumber || hasSpecialChar) {
      score = 1
    }

    // safe
    if (((hasLowerCase || hasUpperCase) && hasNumber) || (hasNumber && hasSpecialChar) || ((hasLowerCase || hasUpperCase) && hasSpecialChar)) {
      score = 3
    }
  } else if (pass.length >= 8) {
    // weak
    if (hasLowerCase || hasUpperCase || hasNumber || hasSpecialChar) {
      score = 1
    }

    // safe
    if (((hasLowerCase || hasUpperCase) && hasNumber) || (hasNumber && hasSpecialChar) || ((hasLowerCase || hasUpperCase) && hasSpecialChar)) {
      score = 3
    }

    // strong
    if (hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar) {
      score = 4
    }
  }

  return score
}

export default scorePassword
