import * as React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { createNetworkInterface } from 'apollo-client';
import { Client } from 'subscriptions-transport-ws';
import { ApolloProvider } from 'react-apollo';

import routes from './routes';
import createApolloClient from './helpers/create-apollo-client';
import addGraphQLSubscriptions from './helpers/subscriptions';

const wsClient = new Client('ws://localhost:8080');

const networkInterface = createNetworkInterface({
	uri: '/graphql',
	opts: {
		credentials: 'same-origin',
	},
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
	networkInterface,
	wsClient,
);

const client = createApolloClient({
	networkInterface: networkInterfaceWithSubscriptions,
	ssrForceFetchDelay: 100,
});

render((
	<ApolloProvider client={client}>
		<Router history={browserHistory}>
			{routes}
		</Router>
	</ApolloProvider>
), document.getElementById('conent'));
