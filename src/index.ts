import * as winston from 'winston';
import ReactServer from './reactServer';
import GraphQLServer from './graphQLServer';
import SubServer from './subscriptionServer';
import schema from './schema';

import config from './config';

const reactServer = new ReactServer (
	config.reactServer.PORT,
	() => winston.info(`React Server is now listening on http://localhost:${ config.reactServer.PORT }`),
	config.graphQLServer.PORT,
);

const graphQLServer = new GraphQLServer (
	config.graphQLServer.PORT,
	schema,
	() => winston.info(`GraphQL Server is now listening on http://localhost:${ config.graphQLServer.PORT }`),
);

const subscriptionServer = new SubServer (
	config.subscriptionServer.PORT,
	schema,
	{ placeholder: () => { return null; } },
	() => winston.info(`Subscription Server is now listening on http://localhost:${ config.subscriptionServer.PORT }`),
);
