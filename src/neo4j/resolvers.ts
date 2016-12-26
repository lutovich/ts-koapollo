import { GraphDatabase, Transaction } from 'neo4j';

let db = new GraphDatabase('http://localhost:7474');

const getNodeById = ( id: string ) => {
	return new Promise( ( resolve, reject ) => {
		let node = db.cypher({
			query: `
				MATCH (n:DATA {id: {id}})
				RETURN n
			`,
			params: { id },
			lean: true,
		}, ( err, results ) => {
			if ( err ) reject( err );
			resolve( results );
		} );
	});
};

const getFieldsByParent = ( field: string, parent: string ) => {
	return new Promise( ( resolve, reject ) => {
		db.cypher({
			query: `
			MATCH (n:DATA {id: {parent}})-[:INSTANCE_OF]->()-[:Field {name: {field}}]->(x)<-[:INSTANCE_OF]-(f:DATA)
				MATCH (f)--(n)
			RETURN f
			`,
			params: { field, parent },
			lean: true,
		}, ( err, results ) => {
			if ( err ) { reject( err ); }
			resolve( results );
		} );
	} );
};

export { db, getNodeById, getFieldsByParent };
