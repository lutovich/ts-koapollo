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
const koaStatic = require("koa-static");
const proxy = require("koa-proxy");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const winston = require("winston");
const apollo_client_1 = require("apollo-client");
const react_apollo_1 = require("react-apollo");
const react_router_1 = require("react-router");
const path = require("path");
const routes_1 = require("./routes");
const Html_1 = require("./routes/Html");
const create_apollo_client_1 = require("./helpers/create-apollo-client");
const basePort = process.env.PORT || 3000;
const apiHost = `http://localhost:${basePort + 10}`;
const apiUrl = `${apiHost}/graphql`;
const scriptUrl = `http://localhost:${basePort}/bundle.js`;
const app = new koa();
app.use(koaStatic(path.join(process.cwd(), 'public')));
app.use(proxy({
    host: apiUrl,
    match: /^\/(graphi?ql|log(in|out))\//,
}));
app.use(function* () {
    let client;
    let props;
    let toRender;
    react_router_1.match({
        routes: routes_1.default,
        location: this.originalUrl,
    }, (error, redirectLocation, renderProps) => {
        winston.info(`error: ${error}\nredirectLocation: ${redirectLocation}\nrenderProps: ${JSON.stringify(renderProps, null, 2)}`);
        if (error) {
            this.throw(error.message, 500);
        }
        else if (redirectLocation) {
            this.redirect(redirectLocation.pathname + redirectLocation.search);
        }
        else if (renderProps) {
            props = renderProps;
            client = create_apollo_client_1.default({
                ssrMode: true,
                networkInterface: apollo_client_1.createNetworkInterface({
                    uri: apiUrl,
                    opts: {
                        credentials: 'same-origin',
                        headers: this.headers,
                    },
                }),
            });
            const component = (React.createElement(react_apollo_1.ApolloProvider, { client: client },
                React.createElement(react_router_1.RouterContext, __assign({}, props))));
            let content = function* () { return react_apollo_1.renderToStringWithData(component); }();
            const html = (React.createElement(Html_1.default, { children: content, scriptUrl: scriptUrl }));
            this.body = `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`;
        }
        else {
            this.throw('Not Found', 404);
        }
    });
});
app.listen(basePort, () => winston.info(`App Server is now listening on http://localhost:${basePort}`));
