function oneOf<T>(key: string, allowed: readonly T[]): T {
  const value = process.env[key]
  const match = allowed.find((item) => item === value)

  if (match === undefined) {
    throw new Error(`${key} invalid: "${value}" (use: ${allowed.join(', ')})`)
  }
  return match
}

export default oneOf

