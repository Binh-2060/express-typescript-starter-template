import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  limit: 10000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

export default limiter;
