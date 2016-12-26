"use strict";
const neo4j = require("neo4j");
const db = new neo4j.GraphDatabase({
    agent: null,
    auth: { username: 'neo4j', password: 'password' },
    headers: {},
    proxy: null,
    url: 'http://localhost:7474',
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = db;
//# sourceMappingURL=db.js.map