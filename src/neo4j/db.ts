import * as neo4j from 'neo4j';

const db = new neo4j.GraphDatabase({
	agent: null,
	auth: {username: 'neo4j', password: 'password'},
	headers: {},
	proxy: null,
	url: 'http://localhost:7474',
});

export default db;
