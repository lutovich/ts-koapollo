"use strict";
const printer_1 = require("graphql-tag/printer");
const addGraphQLSubscriptions = (networkInterface, wsClient) => Object.assign(networkInterface, {
    subscribe: (request, handler) => wsClient.subscribe({
        query: printer_1.print(request.query),
        variables: request.variables,
    }, handler),
    unsubscribe: (id) => {
        wsClient.unsubscribe(id);
    },
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addGraphQLSubscriptions;
