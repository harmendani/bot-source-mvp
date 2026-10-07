export function shutDown(fastify: any): any {
  return () => {
    fastify.log.info('Received kill signal, shutting down gracefully.');
    fastify.close(() => {
      fastify.log.info('Closed out with remaining connections.');
      process.exit(0);
    });
    setTimeout(() => {
      fastify.log.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  }
}



