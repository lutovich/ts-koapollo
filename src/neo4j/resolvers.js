"use strict";
const db_1 = require("./db");
const getNodeById = (id) => {
    return new Promise((resolve, reject) => {
        const session = db_1.default.session();
        session.run(`
				MATCH (n:DATA {id: {id}})
				RETURN n
			`, { id: id })
            .then((results) => {
            resolve(results);
            session.close();
        })
            .catch((err) => {
            console.error(err);
            session.close();
        });
    });
};
exports.getNodeById = getNodeById;
const getFieldsByParent = (relname, parent) => {
    return new Promise((resolve, reject) => {
        const session = db_1.default.session();
        session.run(`
				MATCH (n:DATA {id: {parent}})-[:Field {relname: {field}}]-(f:DATA)
				RETURN f
			`, { relname, parent })
            .then((results) => {
            resolve(results);
            session.close();
        })
            .catch((err) => {
            console.error(err);
            session.close();
        });
    });
};
exports.getFieldsByParent = getFieldsByParent;
//# sourceMappingURL=resolvers.js.map