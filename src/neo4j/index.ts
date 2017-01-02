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

import session from './db';
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

session.run({
	statements: `
	MATCH (p:SCHEMA:Type)
		OPTIONAL MATCH (p)-[r:Field]-(n:SCHEMA:Type)
		RETURN p.name as name, collect({name: r.name, relname: r.relname, type: n.name}) as fields
	`,
} )
	.then( ( results ) => {
		results.map( ( type ) => {
			schemaTypes[ type.name ] = new GraphQLObjectType({
				name: type.name,
				fields: () => {
					let fields = {};
					if ( !scalarTypes[ type.name ] ) {
						type.fields.map( ( field ) => {
							if ( field.name ) {
								fields[field.name] = {
									type: scalarTypes[field.type] ? scalarTypes[field.type] : schemaTypes[field.type],
									args: {},
									resolve: async (parent, args) => {
										return await getFieldsByParent( field.relname ? field.relname : field.name , parent.id );
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
	});
