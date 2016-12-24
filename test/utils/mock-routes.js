"use strict";
const React = require("react");
const react_router_1 = require("react-router");
;
;
class Layout extends React.Component {
    render() {
        return (React.createElement("div", { className: 'Layout' }, "Layout"));
    }
}
class Path extends React.Component {
    render() {
        return (React.createElement("div", { className: 'Path' }, "Layout"));
    }
}
const routes = (React.createElement(react_router_1.Route, { path: '/', component: Layout },
    React.createElement(react_router_1.Route, { path: '/path', component: Path }),
    React.createElement(react_router_1.Redirect, { from: '/redirect', to: '/' })));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
//# sourceMappingURL=mock-routes.js.map