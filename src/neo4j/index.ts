import {
	graphql,
	introspectionQuery,
	printSchema,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLScalarType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
} from 'graphql';

import db from './db';
import { getNodeById, getFieldsByParent } from './resolvers';

interface TypeData {
	name: string;
	fields: [{
		name: string,
		type: string,
	}];
}

/* tslint:disable:no-string-literal */
let scalarTypes: { [key: string]: GraphQLScalarType } = {};
scalarTypes['ID'] = GraphQLID;
scalarTypes['String'] = GraphQLString;
scalarTypes['Int'] = GraphQLInt;

let schemaTypes: { [key: string]: GraphQLObjectType } = {};

console.log( JSON.stringify(schemaTypes, null, 2) );

db.cypher({
	query: `
	MATCH (p:SCHEMA:Type)
		OPTIONAL MATCH (p)-[r:Field]-(n:SCHEMA:Type)
		RETURN p.name as name, collect({name: r.name, type: n.name}) as fields
	`,
}, ( err, types: [TypeData] ) => {
	if ( err ) {
		console.log( err );
	} else {
		types.map( ( type ) => {
			schemaTypes[ type.name ] = new GraphQLObjectType({
				name: type.name,
				fields: () => {
					let fields = {};
					if ( !scalarTypes[ type.name ] ) {
						type.fields.map( ( field ) => {
							if ( !field.name ) fields = null;
							else {
								fields[field.name] = {
									type: scalarTypes[field.type] ? scalarTypes[field.type] : schemaTypes[field.type],
									args: {},
									resolve: async (parent, args) => {
										return await getFieldsByParent(
											db,
											{field: field.name, parent: parent.id},
										);
									},
								};
							}
						});
					}
					return fields;
				},
			});
		});

		const schema = new GraphQLSchema({
			query: schemaTypes['Query'],
		});

		console.log(printSchema(schema));
	}
});
