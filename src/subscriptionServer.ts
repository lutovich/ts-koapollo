import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createServer } from 'http';
import { GraphQLSchema } from 'graphql';

import config from './config';

export default class SubServer {
	// TODO: Get a proper type definition for SetupFunctions here. Currently defined privately.
	constructor ( port: number, subscriptionManager: SubscriptionManager, callback?: Function ) {

		const websocketServer = createServer(
			( request, response ) => {
				response.writeHead( 404 );
				response.end();
			},
		);

		websocketServer.listen ( port, callback() );

		const subscriptionServer = new SubscriptionServer({
			subscriptionManager,
		},
		websocketServer);
	}
}
