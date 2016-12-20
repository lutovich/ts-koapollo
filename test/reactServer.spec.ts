import ReactServer from '../src/reactServer';

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
	static ReactServer: ReactServer;
	static serverCallback: sinon.SinonSpy;

	static before() {
		console.log('    Before the Tests\n      Mount the Server');
		this.serverCallback = sinon.spy();
		this.ReactServer = new ReactServer(
			2000,
			this.serverCallback,
		);
	}
	@test 'It should return a server object.'() {
		expect(ReactServerTests.ReactServer).to.be.an.instanceof(ReactServer);
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
}
