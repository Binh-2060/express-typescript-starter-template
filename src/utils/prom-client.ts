import * as prometheus from 'prom-client';
const register = new prometheus.Registry();

const httpRequestsTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

const memoryUsageGauge = new prometheus.Gauge({
  name: 'nodejs_memory_usage_bytes',
  help: 'Memory usage of the Node.js process in bytes',
  labelNames: ['type'],
});

register.registerMetric(httpRequestsTotal);
register.registerMetric(memoryUsageGauge);

export default {
  httpRequestsTotal: httpRequestsTotal,
  register: register,
  memoryUsageGauge: memoryUsageGauge,
};
