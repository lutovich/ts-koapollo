"use strict";
const chai = require("chai");
const chaiImmutable = require("chai-immutable");
const jsdom = require("jsdom");
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;
this.document = doc;
this.window = win;
propagateToGlobal(win);
function propagateToGlobal(window) {
    for (let key in window) {
        if (!window.hasOwnProperty(key))
            continue;
        if (key in global)
            continue;
        global[key] = window[key];
    }
}
chai.use(chaiImmutable);
//# sourceMappingURL=dom.js.map