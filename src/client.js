"use strict";
const React = require("react");
const react_dom_1 = require("react-dom");
const react_router_1 = require("react-router");
const apollo_client_1 = require("apollo-client");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const react_apollo_1 = require("react-apollo");
const routes_1 = require("./routes");
const create_apollo_client_1 = require("./helpers/create-apollo-client");
const subscriptions_1 = require("./helpers/subscriptions");
const wsClient = new subscriptions_transport_ws_1.Client('ws://localhost:8080');
const networkInterface = apollo_client_1.createNetworkInterface({
    uri: '/graphql',
    opts: {
        credentials: 'same-origin',
    },
});
const networkInterfaceWithSubscriptions = subscriptions_1.default(networkInterface, wsClient);
const client = create_apollo_client_1.default({
    networkInterface: networkInterfaceWithSubscriptions,
    ssrForceFetchDelay: 100,
});
react_dom_1.render((React.createElement(react_apollo_1.ApolloProvider, { client: client },
    React.createElement(react_router_1.Router, { history: react_router_1.browserHistory }, routes_1.default))), document.getElementById('conent'));
