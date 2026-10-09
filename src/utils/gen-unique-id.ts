import hyperid from 'hyperid'

const instance = hyperid()

export const generateUniqueId = (): string => instance()
