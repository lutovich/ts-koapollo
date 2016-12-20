import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createServer } from 'http';
import { GraphQLSchema } from 'graphql';

import config from './config';

export default async function subscriptionServer ( port: number, callback: Function, schema: GraphQLSchema ) {
	const pubsub = new PubSub();
	const subscriptionManager = new SubscriptionManager({
		schema,
		pubsub,
		setupFunctions: {
			placeholder: ( options, args ) => { return null },
		},
	})

	const websocketServer = createServer(
		( request, response ) => {
			response.writeHead( 404 );
			response.end();
		},
	);

	websocketServer.listen ( port, callback() );

	const subscriptionServer = new SubscriptionServer({
		subscriptionManager,
		onSubscribe: ( msg, params ) => {
			return null;
		},
	},
websocketServer);
}
