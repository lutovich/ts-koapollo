"use strict";
const db_1 = require("./db");
const getNodeById = (id) => {
    return new Promise((resolve, reject) => {
        db_1.default.run({
            statement: `
				MATCH (n:DATA {id: {id}})
				RETURN n
			`,
            parameters: { id },
        })
            .then((results) => {
            resolve(results);
        })
            .catch((err) => {
            console.error(err);
        });
    });
};
exports.getNodeById = getNodeById;
const getFieldsByParent = (relname, parent) => {
    return new Promise((resolve, reject) => {
        db_1.default.run({
            statements: `
				MATCH (n:DATA {id: {parent}})-[:Field {relname: {field}}]-(f:DATA)
				RETURN f
			`,
            parameters: { relname, parent },
        })
            .then((results) => {
            resolve(results);
        })
            .catch((err) => {
            console.error(err);
        });
    });
};
exports.getFieldsByParent = getFieldsByParent;
//# sourceMappingURL=resolvers.js.map