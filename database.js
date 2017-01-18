var Neo4j = require('neo4j-driver').v1;

var driver = Neo4j.driver(
  'bolt://localhost:4000',
  Neo4j.auth.basic('neo4j','password')
);

driver.onCompleted = function () {
  console.log('Neo4j Driver Created.');
};

driver.onError = function ( err ) {
  console.log('Neo4j Driver Not Created: ' + err );
};

var session = driver.session();

session.run('CREATE (n:Label) RETURN n')
  .then( function ( results ) {
    console.log( results );
    session.close();
  })
  .catch( function ( err ) {
    console.log( err );
    session.close();
  });

session.run('MATCH (n) DELETE n')
  .then( function ( results ) {
    console.log( results );
    session.close();
  })
  .catch( function ( err ) {
    console.log( err );
    session.close();
  });
