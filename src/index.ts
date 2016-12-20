import * as winston from 'winston';
import reactServer from './reactServer';
import graphQLServer from './graphQLServer';
import subscriptionServer from './subscriptionServer';
import schema from './schema';

import config from './config';

reactServer(
	config.reactServer.PORT,
	() => winston.info(`React Server is now listening on http://localhost:${ config.reactServer.PORT }`),
);

graphQLServer(
	config.graphQLServer.PORT,
	() => winston.info(`GraphQL Server is now listening on http://localhost:${ config.graphQLServer.PORT }`),
	schema,
);

subscriptionServer(
	config.subscriptionServer.PORT,
	() => winston.info(`Subscription Server is now listening on http://localhost:${ config.subscriptionServer.PORT }`),
	schema,
);
