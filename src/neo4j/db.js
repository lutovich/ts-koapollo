"use strict";
const v1 = require("neo4j-driver");
const neo4j = v1.v1;
console.log(JSON.stringify(neo4j, null, 2));
const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'password'));
const session = driver.session();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = session;
process.on('SIGINT', () => {
    console.log('Terminating neo4j Session');
    driver.close();
});
//# sourceMappingURL=db.js.map