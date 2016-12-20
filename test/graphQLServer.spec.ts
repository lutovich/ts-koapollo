import GraphQLServer from '../src/graphQLServer';
import schema from './utils/mock-schema';

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as http from 'http';
import * as XHR from 'xhr2';

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

@suite class GraphQLServerTests {
	static graphQLServer: any;
	static serverCallback: sinon.SinonSpy;
	static before() {
		console.log('    Before the Tests\n      Mount the Server');
		this.serverCallback = sinon.spy();
		this.graphQLServer = new GraphQLServer(
			3000,
			this.serverCallback,
			schema,
		);
	}
	@test 'It should return a server object.'() {
		expect(GraphQLServerTests.graphQLServer).to.be.an.instanceof(GraphQLServer);
	}
	@test 'It should call the server callback.'() {
		GraphQLServerTests.serverCallback.should.have.been.called;
	}
	@test @timeout(100) 'It should be listening on the designated port.' ( done ) {
		http.get('http://localhost:3000', ( res ) => {
			expect( res ).to.exist;
			done();
		});
	}
	@test @timeout(100) 'Index Route should be 404.' ( done ) {
		http.get('http://localhost:3000/', ( res ) => {
			expect( res.statusCode ).to.equal( 404 );
			done();
		});
	}
	@test @timeout(100) 'Responds to a basic query.' ( done ) {
		const xhr = new XHR();
		xhr.responseType = 'json';
		xhr.open('POST', 'http://localhost:3000/graphql');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.onloadend = () => {
			expect( xhr.status ).to.equal( 200 );
			done();
		}
		xhr.send( `{ "query": "{ posts {id, title} }" }` );
	}
	@test @timeout(100) 'Responds accurately to a basic query.' ( done ) {
		const xhr = new XHR();
		xhr.responseType = 'json';
		xhr.open('POST', 'http://localhost:3000/graphql');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.onloadend = () => {
			const data = xhr.response.data;
			expect( xhr.response.data ).to.equal( 200 );
			done();
		}
		xhr.send( `{ "query": "{ posts {id, title} }" }` );
	}
}