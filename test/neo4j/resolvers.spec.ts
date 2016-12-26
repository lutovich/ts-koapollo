import { getNodeById, db } from '../../src/neo4j/resolvers';
import { schema } from '../utils/mock-schema';
import { query, wipeQuery } from '../utils/mock-db-builder';

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as http from 'http';
import * as XHR from 'xhr2';
import * as neo4j from 'neo4j';

chai.should();
const expect = chai.expect;

import {
	only,
	skip,
	slow,
	suite,
	test,
	timeout,
} from 'mocha-typescript';

@suite class GetNodeByIdTests {
	static db: neo4j.GraphDatabase;

	static before() {
		console.log('      Initialising MockDB');
		this.db = new neo4j.GraphDatabase('http://localhost:7474');
		this.db.cypher( { query } , ( err, result ) => {
			if ( !err ) console.log('      Initialised MockDB');
			else console.error( err );
		} );
	}
	static after() {
		this.db.cypher( { query: wipeQuery }, ( err, result ) => {
			if ( !err ) console.log('      Initialised MockDB');
			else console.error( err );
		} );
	}
	@test @timeout(1000) async 'It should return a given node' ( done ) {
		let node = await getNodeById('aaa');
		const match = {
			id: 'aaa',
			name: 'John',
		};
		expect( node ).to.deep.equal( match );
		done();
	}
}
