import * as express from 'express';
import * as cors from 'cors';
import { urlencoded, json } from 'body-parser';
import { ErrorHandlers } from './middlewares/errors_loggers';
import { Request, Response, NextFunction } from 'express';
import environment from './environment';
import api from './api';
import { ResponseSuccess } from './utils/presenter';
import { UseRequestId } from './middlewares/requestid';
import { ClientHandlers } from './middlewares/client_loggers';
import Limiter from './utils/rate-limit';
import { ConnectDatabase } from './utils/pg';
const app = express();
const baseUrl = `/api/v${environment.api_version}/`;

app.use(UseRequestId);

app.use(urlencoded({ extended: false }));

app.use(json({ limit: '50mb' }));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  );

  res.setHeader('Access-Control-Allow-Headers', 'content-type, x-access-token');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(cors());

app.use(Limiter);

app.use(ClientHandlers);

app.get('/healthz', (req: Request, res: Response, next: NextFunction) => {
  return ResponseSuccess(res, 200, null, 'Healthy');
});

app.use(baseUrl, api);

//TODO add global handler
app.use(ErrorHandlers);

//TODO check database connection
ConnectDatabase();

export default app;
