// Anchoring with element & error status
export const anchoringErrorField = (data: Array<any>) => {
  // find error element
  const findErrorElement = data.find((val) => val.error === true)

  if (findErrorElement) {
    const el = findErrorElement.element
    // @ts-ignore
    const top = el.offsetTop
    // @ts-ignore
    window.scrollTo({ top: top - 60, behavior: 'smooth' }) // scroll to div element
    return false
  }

  return true
}
