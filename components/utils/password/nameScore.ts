const nameScore = (score: number) => {
  switch (score) {
    case 0:
      return 'risky'
    case 1:
      return 'guessable'
    case 2:
      return 'weak'
    case 3:
      return 'safe'
    case 4:
      return 'secure'
    default:
      return null
  }
}

export default nameScore
