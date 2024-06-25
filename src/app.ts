import * as express from 'express';
import * as cors from 'express';
import { urlencoded } from 'body-parser';
import environment from './environment';
import api from './api';
import { ErrorHandlers } from './middlewares/errors-loggers';
import { ClientHandlers } from './middlewares/client-loggers';
import Limiter from './utils/rate-limit';

const app = express();
const baseUrl = `/api/v${environment.api_version}/`;

app.use(express.json());

app.use(urlencoded({ extended: false }));

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

app.use(baseUrl, api);

app.use(ErrorHandlers);

export default app;
