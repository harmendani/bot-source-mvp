import { webhookRoutes } from './webhook.routes.js';

const routes = [...webhookRoutes]

export default function registerRoutes(app: any) {
  routes.forEach(route => {
    app.route(route)
  })
}



