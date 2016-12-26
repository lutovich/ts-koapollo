"use strict";
const graphql_1 = require("graphql");
const db_1 = require("./db");
const resolvers_1 = require("./resolvers");
let scalarTypes = {};
scalarTypes['ID'] = graphql_1.GraphQLID;
scalarTypes['String'] = graphql_1.GraphQLString;
scalarTypes['Int'] = graphql_1.GraphQLInt;
let schemaTypes = {};
console.log(JSON.stringify(schemaTypes, null, 2));
db_1.default.cypher({
    query: `
	MATCH (p:SCHEMA:Type)
		OPTIONAL MATCH (p)-[r:Field]-(n:SCHEMA:Type)
		RETURN p.name as name, collect({name: r.name, type: n.name}) as fields
	`,
}, (err, types) => {
    if (err) {
        console.log(err);
    }
    else {
        types.map((type) => {
            schemaTypes[type.name] = new graphql_1.GraphQLObjectType({
                name: type.name,
                fields: () => {
                    let fields = {};
                    if (!scalarTypes[type.name]) {
                        type.fields.map((field) => {
                            if (!field.name)
                                fields = null;
                            else {
                                fields[field.name] = {
                                    type: scalarTypes[field.type] ? scalarTypes[field.type] : schemaTypes[field.type],
                                    args: {},
                                    resolve: async (parent, args) => {
                                        return await resolvers_1.getFieldsByParent(db_1.default, { field: field.name, parent: parent.id });
                                    },
                                };
                            }
                        });
                    }
                    return fields;
                },
            });
        });
        const schema = new graphql_1.GraphQLSchema({
            query: schemaTypes['Query'],
        });
        console.log(graphql_1.printSchema(schema));
    }
});
//# sourceMappingURL=index.js.map