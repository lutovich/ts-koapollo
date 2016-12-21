"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const koa = require("koa");
const koaStatic = require("koa-better-static");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const apollo_client_1 = require("apollo-client");
const react_apollo_1 = require("react-apollo");
const react_router_1 = require("react-router");
const routes_1 = require("./routes");
const Html_1 = require("./routes/Html");
const create_apollo_client_1 = require("./helpers/create-apollo-client");
const config_1 = require("./config");
class ReactServer {
    constructor(port, callback, apiPort) {
        const basePort = port;
        apiPort = apiPort || config_1.default.graphQLServer.PORT;
        const apiHost = `http://localhost:${apiPort}`;
        const apiUrl = `${apiHost}/graphql`;
        const scriptUrl = `http://localhost:${basePort}/bundle.js`;
        this.server = new koa();
        this.server.use(koaStatic('/public'));
        this.server.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('Called React Router Middleware');
            let client;
            let props;
            let toRender;
            react_router_1.match({
                routes: routes_1.default,
                location: ctx.originalUrl,
            }, (error, redirectLocation, renderProps) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    console.log(error);
                    ctx.body = { message: error.message };
                    ctx.status = 500;
                }
                else if (redirectLocation) {
                    ctx.redirect(redirectLocation.pathname + redirectLocation.search);
                }
                else if (renderProps) {
                    props = renderProps;
                    client = create_apollo_client_1.default({
                        ssrMode: true,
                        networkInterface: apollo_client_1.createNetworkInterface({
                            uri: apiUrl,
                            opts: {
                                credentials: 'same-origin',
                                headers: ctx.headers,
                            },
                        }),
                    });
                    const component = (React.createElement(react_apollo_1.ApolloProvider, { client: client },
                        React.createElement(react_router_1.RouterContext, __assign({}, props))));
                    let content = yield react_apollo_1.renderToStringWithData(component);
                    const html = (React.createElement(Html_1.default, { children: content, scriptUrl: scriptUrl }));
                    ctx.body = `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`;
                }
                else {
                    ctx.body = { message: 'Page not found' };
                    ctx.status = 404;
                }
                return;
            }));
        }));
        this.server.listen(port, callback());
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReactServer;
//# sourceMappingURL=reactServer.js.map