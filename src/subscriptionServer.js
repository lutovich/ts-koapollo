"use strict";
const graphql_subscriptions_1 = require("graphql-subscriptions");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const http_1 = require("http");
class SubServer {
    constructor(port, schema, setupFunctions, callback) {
        const pubsub = new graphql_subscriptions_1.PubSub();
        const subscriptionManager = new graphql_subscriptions_1.SubscriptionManager({
            schema,
            pubsub,
            setupFunctions: {
                placeholder: (options, args) => { return null; },
            },
        });
        const websocketServer = http_1.createServer((request, response) => {
            response.writeHead(404);
            response.end();
        });
        websocketServer.listen(port, callback());
        const subscriptionServer = new subscriptions_transport_ws_1.SubscriptionServer({
            subscriptionManager,
            onSubscribe: (msg, params) => {
                return null;
            },
        }, websocketServer);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubServer;
//# sourceMappingURL=subscriptionServer.js.map