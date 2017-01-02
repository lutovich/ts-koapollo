import { getNodeById, getFieldsByParent } from '../../src/neo4j/resolvers';
import { schema } from '../utils/mock-schema';
import { query, wipeQuery } from '../utils/mock-db-builder';

import session from '../../src/neo4j/db';

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as http from 'http';
import * as XHR from 'xhr2';
import * as neo4j from 'neo4j-driver';

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
	static before( done ) {
		console.log('      Initialising MockDB');
		session.run( { statements: query } )
			.then( ( result ) => {
				console.log('      Initialised MockDB');
				done();
			} )
			.catch( ( err ) => { console.log( err ); } );
	}
	static after( done ) {
		session.run( { statements: wipeQuery } )
			.then ( ( result ) => {
				console.log('      Wiped MockDB');
				done();
			} )
			.catch( ( err ) => { console.log( err ); } );
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
