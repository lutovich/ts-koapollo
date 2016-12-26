"use strict";
const neo4j_1 = require("neo4j");
let db = new neo4j_1.GraphDatabase('http://localhost:7474');
exports.db = db;
const getNodeById = (id) => {
    return new Promise((resolve, reject) => {
        let node = db.cypher({
            query: `
				MATCH (n:DATA {id: {id}})
				RETURN n
			`,
            params: { id },
            lean: true,
        }, (err, results) => {
            if (err)
                reject(err);
            resolve(results);
        });
    });
};
exports.getNodeById = getNodeById;
const getFieldsByParent = (field, parent) => {
    return new Promise((resolve, reject) => {
        db.cypher({
            query: `
			MATCH (n:DATA {id: {parent}})-[:INSTANCE_OF]->()-[:Field {name: {field}}]->(x)<-[:INSTANCE_OF]-(f:DATA)
				MATCH (f)--(n)
			RETURN f
			`,
            params: { field, parent },
            lean: true,
        }, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
exports.getFieldsByParent = getFieldsByParent;
//# sourceMappingURL=resolvers.js.map