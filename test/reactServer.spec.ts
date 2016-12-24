import ReactServer from '../src/reactServer';
import GraphQLServer from '../src/graphQLServer';
import { schema } from './utils/mock-schema';
import routes from './utils/mock-routes';

import * as koa from 'koa';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as http from 'http';

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

@suite class ReactServerTests {
	static reactServer: ReactServer;
	static serverCallback: sinon.SinonSpy;

	static before() {
		console.log('    Before the Tests\n      Mount the Server');
		this.serverCallback = sinon.spy();
		this.reactServer = new ReactServer(
			2000,
			2010,
			routes,
			this.serverCallback,
		);
	}
	@test 'It should return a server object.'() {
		expect(ReactServerTests.reactServer).to.be.an.instanceof(ReactServer);
	}
	@test 'It should call the server callback.'() {
		ReactServerTests.serverCallback.should.have.been.called;
	}
	@test @timeout(1000) 'It should be listening on the designated port.' ( done ) {
		http.get('http://localhost:2000', ( res ) => {
			expect( res ).to.exist;
			done();
		});
	}
	@test @timeout(1000) 'It should serve an index page.' ( done ) {
		http.get('http://localhost:2000/', ( res ) => {
			expect( res.statusCode ).to.equal( 200 );
			done();
		});
	}
	@test @timeout(1000) 'It should serve another path.' ( done ) {
		http.get('http://localhost:2000/path', ( res ) => {
			expect( res.statusCode ).to.equal( 200 );
			done();
		});
	}
	@test @timeout(1000) 'It should serve the js bundle.' ( done ) {
		http.get('http://localhost:2000/bundle.js', ( res ) => {
			expect( res.statusCode ).to.equal( 200 );
			done();
		});
	}
	@test @timeout(1000) 'It should throw a 404 on a non existent page.' ( done ) {
		http.get('http://localhost:2000/idontexist', ( res ) => {
			expect( res.statusCode ).to.equal( 404 );
			done();
		});
	}
	@test @timeout(1000) 'It should throw a 302 on redirect.' ( done ) {
		http.get('http://localhost:2000/redirect', ( res ) => {
			expect( res.statusCode ).to.equal( 302 );
			done();
		});
	}
	// TODO: Find a way to mock a React-Router Error Throw.
}
