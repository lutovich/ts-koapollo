import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createServer } from 'http';
import { GraphQLSchema } from 'graphql';

import config from './config';

/** Class representing a Subscription Server */
export default class SubServer {
	/**
	 * Create a Subscription Server
	 * @param  {number}        port            Port on which the server will listen
	 * @param  {GraphQLSchema} schema          GraphQL Schema to query
	 * @param  {Object}        setupFunctions  An object containing functionality of subscription server
	 * @param  {Function}      [callback]      Runs on .listen()
	 */
	constructor ( port: number, schema: GraphQLSchema, setupFunctions: { [x: string]: Function }, callback?: Function ) {
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
}
