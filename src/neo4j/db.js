"use strict";
const v1 = require("neo4j-driver");
const neo4j = v1.v1;
const auth = neo4j.auth.basic('neo4j', 'password');
console.log(JSON.stringify(auth));
const driver = neo4j.driver('bolt://localhost', auth);
driver.onCompleted = () => console.log('Neo4j Driver session created.');
driver.onError = (error) => {
    console.log('Neo4j Driver instantiation failed', error);
    throw error;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = driver;
process.on('exit', () => {
    console.log('Terminating neo4j Session');
    driver.close();
});
//# sourceMappingURL=db.js.map