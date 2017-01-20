import driver from './db';

const getNodeById = ( id: string ) => {
	return new Promise( ( resolve, reject ) => {
		const session = driver.session();
		session.run(`
				MATCH (n:DATA {id: {id}})
				RETURN n
			`, { id: id }
		)
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
		session.run(`
				MATCH (n:DATA {id: {parent}})-[:Field {relname: {field}}]-(f:DATA)
				RETURN f
			`,{ relname, parent })
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
