import * as koa from 'koa';
import * as winston from 'winston';

const app = new koa();

app.use( function *() {
	this.body = 'Hello World';
});

app.listen(3000);
winston.info('Listening on port 3000');
