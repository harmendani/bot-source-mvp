function oneOf<T>(key: any, allowed: readonly T[]): T {
  const match = allowed.find((item) => item === key)

  if (match === undefined) {
    throw new Error(`${key} invalid: "${key}" (use: ${allowed})`)
  }
  return match
}

export default oneOf

