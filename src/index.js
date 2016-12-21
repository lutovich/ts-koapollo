"use strict";
const winston = require("winston");
const reactServer_1 = require("./reactServer");
const graphQLServer_1 = require("./graphQLServer");
const subscriptionServer_1 = require("./subscriptionServer");
const schema_1 = require("./schema");
const config_1 = require("./config");
const reactServer = new reactServer_1.default(config_1.default.reactServer.PORT, () => winston.info(`React Server is now listening on http://localhost:${config_1.default.reactServer.PORT}`), config_1.default.graphQLServer.PORT);
const graphQLServer = new graphQLServer_1.default(config_1.default.graphQLServer.PORT, schema_1.default, () => winston.info(`GraphQL Server is now listening on http://localhost:${config_1.default.graphQLServer.PORT}`));
subscriptionServer_1.default(config_1.default.subscriptionServer.PORT, () => winston.info(`Subscription Server is now listening on http://localhost:${config_1.default.subscriptionServer.PORT}`), schema_1.default);
//# sourceMappingURL=index.js.map