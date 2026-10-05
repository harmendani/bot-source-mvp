const webHooksSchemas = {
  verifyRouteSchema: {
    querystring: {
      type: 'object',
      required: ['hub.mode', 'hub.verify_token', 'hub.challenge'],
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
    response: { 200: { type: 'string' } }
  }
}

export default webHooksSchemas;

