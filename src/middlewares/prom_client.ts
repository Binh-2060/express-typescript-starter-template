import * as prom from '../utils/prom-client';

export const SetMemoryUsage = () => {
  const memoryUsage = process.memoryUsage();
  prom.default.memoryUsageGauge.set({ type: 'rss' }, memoryUsage.rss);
  prom.default.memoryUsageGauge.set(
    { type: 'heapTotal' },
    memoryUsage.heapTotal
  );
  prom.default.memoryUsageGauge.set({ type: 'heapUsed' }, memoryUsage.heapUsed);
  prom.default.memoryUsageGauge.set({ type: 'external' }, memoryUsage.external);
};
