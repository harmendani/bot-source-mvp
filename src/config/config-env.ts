import pkg from '../../package.json'
import { oneOf } from '../utils'

const NODE_ENVS = ['dev', 'hml', 'prod'] as const
const LOG_LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'] as const

type NodeEnv = (typeof NODE_ENVS)[number]
type LogLevel = (typeof LOG_LEVELS)[number]

interface Env {
  appName: string
  appVersion: string
  nodeEnv: NodeEnv
  isProduction: boolean
  port: number
  logLevel: LogLevel
}

function loadEnv(): Env {
  const nodeEnv = oneOf('NODE_ENV', NODE_ENVS)
  const logLevel = oneOf('LOG_LEVEL', LOG_LEVELS)
  const port = Number(process.env.PORT)

  if (!process.env.PORT?.trim() || !Number.isInteger(port)) {
    throw new Error(`Invalid or empty PORT value: "${process.env.PORT}"`)
  }

  return Object.freeze({
    port,
    nodeEnv,
    appName: pkg.name,
    appVersion: pkg.version,
    isProduction: nodeEnv === 'prod',
    logLevel
  })
}

export const env: Env = loadEnv()
