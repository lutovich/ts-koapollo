"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const graphql_subscriptions_1 = require("graphql-subscriptions");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const http_1 = require("http");
function subscriptionServer(port, callback, schema) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = subscriptionServer;
//# sourceMappingURL=subscriptionServer.js.map