import SubServer from '../src/subscriptionServer';
import schema from './utils/mock-schema';

import * as koa from 'koa';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as http from 'http';
import { Client } from 'subscriptions-transport-ws';

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

@suite class SubscriptionServerTests {
	static subServer: SubServer;

	static before() {
		console.log('    Before the Tests\n      Mount the Server');
		this.serverCallback = sinon.spy();
		this.graphQLServer = new SubServer(
			8080,
			schema,
			this.serverCallback,
		);
	}
	@test 'It should return a server object.'() {
		expect(GraphQLServerTests.graphQLServer).to.be.an.instanceof(SubServer);
	}
	@test 'It should call the server callback.'() {
		GraphQLServerTests.serverCallback.should.have.been.called;
	}
	// TODO: Finish Testing Subscriptions using Client from subscriptions-transport-ws
}
