import type { FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify'
import { LogController } from 'fastify'
import { env } from './index'

function stripQuery(url: string): string {
  const index = url.indexOf('?')
  return index === -1 ? url : url.slice(0, index)
}

export const loggerOptions: Exclude<FastifyServerOptions['logger'], boolean | undefined> = {
  level: env.logLevel,
  base: { app: env.appName, version: env.appVersion, env: env.nodeEnv },
  serializers: {
    req: (req) => ({
      method: req.method,
      path: stripQuery(req.url),
      ip: req.ip,
      host: req.host,
      userAgent: req.headers?.['user-agent'],
    }),
  },
}

export class AppLogController extends LogController {
  constructor() {
    super({
      disableRequestLogging: (request) => {
        return request.url === '/health'
      }
    })
  }

  override incomingRequest(): void { }

  override routeNotFound(): void { }

  override requestCompleted(error: Error | null | undefined, request: FastifyRequest, reply: FastifyReply): void {
    if (this.isLogDisabled(request)) return

    const data = { req: request, res: reply, responseTime: reply.elapsedTime }
    if (error) {
      reply.log.error({ ...data, err: error }, 'request errored')
    } else if (reply.statusCode >= 500) {
      reply.log.error(data, 'request completed')
    } else {
      reply.log.info(data, 'request completed')
    }
  }

  override defaultErrorLog(error: Error, request: FastifyRequest, reply: FastifyReply): void {
    if (this.isLogDisabled(request)) return

    if (reply.statusCode >= 500) {
      reply.log.error({ err: error }, error.message)
    } else {
      const code = 'code' in error ? error.code : undefined
      reply.log.warn({ errCode: code, statusCode: reply.statusCode }, error.message)
    }
  }
}
