import * as neo4j from 'neo4j';

const db = new neo4j.GraphDatabase('http://localhost:7474');
db.cypher({
	query: `
		create (:TEST {prop: 'prop'})
		match (n) return n
	`}
	,
	( err, result ) => {
		if ( !err ) console.log('      Initialised MockDB');
		else console.error( err );
	},
);
