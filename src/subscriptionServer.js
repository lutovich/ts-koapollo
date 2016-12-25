"use strict";
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const http_1 = require("http");
class SubServer {
    constructor(port, subscriptionManager, callback) {
        const websocketServer = http_1.createServer((request, response) => {
            response.writeHead(404);
            response.end();
        });
        websocketServer.listen(port, callback());
        const subscriptionServer = new subscriptions_transport_ws_1.SubscriptionServer({
            subscriptionManager,
        }, websocketServer);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubServer;
//# sourceMappingURL=subscriptionServer.js.map