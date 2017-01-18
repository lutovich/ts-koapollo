import driver from './db';

const getNodeById = ( id: string ) => {
	return new Promise( ( resolve, reject ) => {
		const session = driver.session();
		session.run({
			statement: `
				MATCH (n:DATA {id: {id}})
				RETURN n
			`,
			parameters: { id },
		})
		.then( ( results ) => {
			resolve( results );
			session.close();
		})
		.catch( ( err ) => {
			console.error( err );
			session.close();
		});
	});
};

const getFieldsByParent = ( relname: string, parent: string ) => {
	return new Promise( ( resolve, reject ) => {
		const session = driver.session();
		session.run({
			statements: `
				MATCH (n:DATA {id: {parent}})-[:Field {relname: {field}}]-(f:DATA)
				RETURN f
			`,
			parameters: { relname, parent },
		})
		.then( ( results ) => {
			resolve( results );
			session.close();
		})
		.catch( ( err ) => {
			console.error( err );
			session.close();
		});
	} );
};

export { getNodeById, getFieldsByParent };
