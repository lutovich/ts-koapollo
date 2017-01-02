import session from './db';

const getNodeById = ( id: string ) => {
	return new Promise( ( resolve, reject ) => {
		session.run({
			statement: `
				MATCH (n:DATA {id: {id}})
				RETURN n
			`,
			parameters: { id },
		})
		.then( ( results ) => {
			resolve( results );
		})
		.catch( ( err ) => {
			console.error( err );
		});
	});
};

const getFieldsByParent = ( relname: string, parent: string ) => {
	return new Promise( ( resolve, reject ) => {
		session.run({
			statements: `
				MATCH (n:DATA {id: {parent}})-[:Field {relname: {field}}]-(f:DATA)
				RETURN f
			`,
			parameters: { relname, parent },
		})
		.then( ( results ) => {
			resolve( results );
		})
		.catch( ( err ) => {
			console.error( err );
		});
	} );
};

export { getNodeById, getFieldsByParent };
