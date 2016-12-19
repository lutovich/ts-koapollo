"use strict";
const React = require("react");
const basePort = process.env.PORT || 3000;
;
;
class Html extends React.Component {
    render() {
        return (React.createElement("html", { lang: 'en' },
            React.createElement("head", null,
                React.createElement("meta", { charSet: 'utf8' }),
                React.createElement("meta", { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
                React.createElement("title", null, "Koapollo")),
            React.createElement("body", null,
                React.createElement("div", { id: 'content' }, this.props.children),
                React.createElement("script", { src: this.props.scriptUrl, charSet: 'UTF-8' }))));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Html;
