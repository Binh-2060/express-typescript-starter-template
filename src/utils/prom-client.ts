import * as prometheus from 'prom-client';
const register = new prometheus.Registry();

const httpRequestsTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

register.registerMetric(httpRequestsTotal);

export default {
  httpRequestsTotal: httpRequestsTotal,
  register: register,
};
