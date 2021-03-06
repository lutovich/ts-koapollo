"use strict";
const koa = require("koa");
const koaBody = require("koa-bodyparser");
const koaRouter = require("koa-router");
const graphql_server_koa_1 = require("graphql-server-koa");
class GraphQLServer {
    constructor(port, schema, callback) {
        this.server = new koa();
        this.router = new koaRouter();
        this.server.use(koaBody());
        this.router.post('/graphql', graphql_server_koa_1.graphqlKoa({
            schema,
        }));
        this.router.get('/graphiql', graphql_server_koa_1.graphiqlKoa({
            endpointURL: '/graphql',
        }));
        this.server.use(this.router.routes());
        this.server.use(this.router.allowedMethods());
        this.server.listen(port, callback ? callback() : null);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GraphQLServer;
//# sourceMappingURL=graphQLServer.js.map