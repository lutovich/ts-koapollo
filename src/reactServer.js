"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const koa = require("koa");
const koaStatic = require("koa-better-static");
const convert = require("koa-convert");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const apollo_client_1 = require("apollo-client");
const react_apollo_1 = require("react-apollo");
const react_router_1 = require("react-router");
const path = require("path");
const Html_1 = require("./routes/Html");
const create_apollo_client_1 = require("./helpers/create-apollo-client");
class ReactServer {
    constructor(port, apiPort, routes, callback) {
        const basePort = port;
        const apiHost = `http://localhost:${apiPort}`;
        const apiUrl = `${apiHost}/graphql`;
        const scriptUrl = `http://localhost:${basePort}/bundle.js`;
        this.server = new koa();
        this.server.use(convert(koaStatic(path.join(process.cwd() + '/public'))));
        this.server.use(async (ctx, next) => {
            let client;
            let props;
            let toRender;
            await react_router_1.match({
                routes,
                location: ctx.originalUrl,
            }, async (error, redirectLocation, renderProps) => {
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
                    let content = await react_apollo_1.renderToStringWithData(component);
                    const html = (React.createElement(Html_1.default, { children: content, scriptUrl: scriptUrl }));
                    ctx.body = `<!doc type html>\n${ReactDOMServer.renderToStaticMarkup(html)}`;
                    ctx.status = 200;
                }
                else {
                    ctx.body = { message: 'Page not found' };
                    ctx.status = 404;
                }
            });
        });
        this.server.listen(port, callback());
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReactServer;
//# sourceMappingURL=reactServer.js.map