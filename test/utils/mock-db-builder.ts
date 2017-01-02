const query = `
	CREATE (string:SCHEMA:TEST:Type {name: 'String'})
	CREATE (int:SCHEMA:TEST:Type {name: 'Int'})
	CREATE (id:SCHEMA:TEST:Type {name: 'ID'})
	CREATE (query:SCHEMA:TEST:Type {name: 'Query'})
	CREATE (mutation:SCHEMA:TEST:Type {name: 'Mutation'})
	CREATE (subscription:SCHEMA:TEST:Type {name: 'Subscription'})
	CREATE (author:SCHEMA:TEST:Type {name: 'Author'})
	CREATE (post:SCHEMA:TEST:Type {name: 'Post'})
	CREATE (comment:SCHEMA:TEST:Type {name: 'Comment'})
	CREATE (post)-[:Field {name: 'id'}]->(id)
	CREATE (post)-[:Field {name: 'title'}]->(string)
	CREATE (post)-[:Field {name: 'author', relname: 'postauthor'}]->(author)
	CREATE (post)-[:Field {name: 'comments', relname: 'postcomments'}]->(comment)
	CREATE (comment)-[:Field {name: 'id'}]->(id)
	CREATE (comment)-[:Field {name: 'author', relname: 'commentauthor'}]->(author)
	CREATE (author)-[:Field {name: 'id'}]->(id)
	CREATE (author)-[:Field {name: 'name'}]->(string)
	CREATE (author)-[:Field {name: 'posts', relname: 'postauthor'}]->(post)
	CREATE (author)-[:Field {name: 'comments', relname: 'commentauthor'}]->(comment)
	CREATE (query)-[:Field {name: 'posts'}]->(post)
	CREATE (query)-[:Field {name: 'authors'}]->(author)

	CREATE (a1:DATA:TEST:Author {id: 'aaa', name: 'John'})
	CREATE (a1)-[:INSTANCE_OF]->(author)
	CREATE (a2:DATA:TEST:Author {id: 'aab', name: 'Bob'})
	CREATE (a2)-[:INSTANCE_OF]->(author)
	CREATE (p1:DATA:TEST:Post {id: 'paa', title: 'Title 1'})-[:Field {relname: 'postauthor'}]->(a1)
	CREATE (p1)-[:INSTANCE_OF]->(post)
	CREATE (p2:DATA:TEST:Post {id: 'pab', title: 'Title 2'})-[:Field {relname: 'postauthor'}]->(a1)
	CREATE (p2)-[:INSTANCE_OF]->(post)
	CREATE (c1:DATA:TEST:Comment {id: 'caa'})<-[:Field {relname: 'postcomments'}]-(p1)
	CREATE (c1)-[:Field {relname: 'commentauthor'}]->(a2)
	CREATE (c1)-[:INSTANCE_OF]->(comment)
	CREATE (c2:DATA:TEST:Comment {id: 'cab'})<-[:Field {relname: 'postcomments'}]-(p1)
	CREATE (c2)-[:Field {relname: 'commentauthor'}]->(a1)
	CREATE (c2)-[:INSTANCE_OF]->(comment)
`;

const wipeQuery = `
	MATCH (n:TEST)
	OPTIONAL MATCH (n)-[r]-()
	DELETE n, r
`;

export { query, wipeQuery }
