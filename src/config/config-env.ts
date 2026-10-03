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
  verifyToken?: string
}

function loadEnv(): Env {
  const nodeEnv = oneOf(process.env.NODE_ENV, NODE_ENVS)
  const logLevel = oneOf(process.env.LOG_LEVEL, LOG_LEVELS)
  const port = Number(process.env.PORT)
  const verifyToken = process.env.IG_VERIFY_TOKEN

  if (!process.env.PORT?.trim() || !Number.isInteger(port)) {
    throw new Error(`Invalid or empty PORT value: "${process.env.PORT}"`)
  }

  return Object.freeze({
    port,
    nodeEnv,
    appName: pkg.name,
    appVersion: pkg.version,
    isProduction: nodeEnv === 'prod',
    logLevel,
    verifyToken,
  })
}

export const env: Env = loadEnv()
