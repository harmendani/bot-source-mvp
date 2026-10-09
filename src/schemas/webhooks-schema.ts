export const webHooksSchemas = {
  verifyRouteSchema: {
    querystring: {
      type: 'object',
      required: ['hub.mode', 'hub.verify_token', 'hub.challenge'],
      additionalProperties: false,
      maxProperties: 3,
      properties: {
        'hub.mode': { type: 'string' },
        'hub.verify_token': { type: 'string' },
        'hub.challenge': { type: 'string' }
      }
    },
    response: {
      200: { type: 'string' },
      403: { type: 'string' }
    }
  },
  notifyRouteSchema: {
    body: { type: 'object', additionalProperties: true },
    querystring: { type: 'object', maxProperties: 0 },
    response: { 200: { type: 'string' } }
  }
}


