import * as winston from 'winston';
import app from './server';

const basePort = process.env.PORT || 3000;

app.listen(basePort, () => winston.info(`App Server is now listening on http://localhost:${basePort}`));
