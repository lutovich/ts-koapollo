import { getNodeById, getFieldsByParent } from '../../src/neo4j/resolvers';
import { schema } from '../utils/mock-schema';
import { query, wipeQuery } from '../utils/mock-db-builder';

import driver from '../../src/neo4j/db';

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as http from 'http';
import * as XHR from 'xhr2';
const expect = chai.expect;

describe( 'GetNodeByIdTests', function () {
	before( function ( done ) {
		const session = driver.session();
		console.log('      Initialising MockDB');
		session.run( query )
			.then( ( result ) => {
				console.log('      Initialised MockDB');
				session.close();
				done();
			} )
			.catch( ( err ) => {
				console.log( err );
				session.close();
				done( err );
			} );
	} );
	after( function ( done ) {
		const session = driver.session();
		session.run( wipeQuery )
			.then ( ( result ) => {
				console.log('      Wiped MockDB');
				session.close();
				done();
			} )
			.catch( ( err ) => {
				console.log( err );
				session.close();
				done( err );
			} );
	} );
	it( 'Should return a given node', async function () {
		let node = await getNodeById('aaa');
		const match = {
			id: 'aaa',
			name: 'John',
		};
		return expect( node ).to.deep.equal( match );
	} );
} );
