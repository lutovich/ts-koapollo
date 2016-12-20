"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const koa = require("koa");
const koaBody = require("koa-bodyparser");
const koaRouter = require("koa-router");
const graphql_server_koa_1 = require("graphql-server-koa");
function graphqlServer(port, callback, schema) {
    return __awaiter(this, void 0, void 0, function* () {
        const gql = new koa();
        const router = new koaRouter();
        gql.use(koaBody());
        router.post('/graphql', graphql_server_koa_1.graphqlKoa({ schema }));
        router.get('/graphiql', graphql_server_koa_1.graphiqlKoa({ endpointURL: '/graphql' }));
        gql.use(router.routes());
        gql.use(router.allowedMethods());
        gql.listen(port, callback());
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = graphqlServer;
