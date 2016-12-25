import SubServer from '../src/subscriptionServer';
import { schema, subscriptionManager } from './utils/mock-schema';
import GraphQLServer from '../src/graphQLServer';

import * as koa from 'koa';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as http from 'http';
import * as XHR from 'xhr2';
import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import { Client } from 'subscriptions-transport-ws';
import ApolloClient, { createNetworkInterface, NetworkInterface } from 'apollo-client';
import { print } from 'graphql-tag/printer';

chai.should();
const expect = chai.expect;
const assert = chai.assert;

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
	static serverCallback: sinon.SinonSpy;
	static subscriptionManager: SubscriptionManager;

	static before() {
		console.log('    Before the Tests\n      Mount the Server');
		this.serverCallback = sinon.spy();
		this.subscriptionManager = subscriptionManager;
		this.subServer = new SubServer(
			8080,
			this.subscriptionManager,
			this.serverCallback,
		);
	}
	@test 'It should return a server object.'() {
		expect(SubscriptionServerTests.subServer).to.be.an.instanceof(SubServer);
	}
	@test 'It should call the server callback.'() {
		SubscriptionServerTests.serverCallback.should.have.been.called;
	}
	@test @timeout(1000) 'It should 404 an index page.'( done ) {
		http.get('http://localhost:8080/', ( res ) => {
			expect( res.statusCode ).to.equal( 404 );
			done();
		});
	}
	@test @timeout(1000) 'It should publish subscriptions.'( done ) {
		const client = new Client('ws://localhost:8080/');
		setTimeout( () => { client.subscribe({
			query: 'subscription postInfo($id: Int) { post(id: $id) { id, title } }',
			operationName: 'postInfo',
			variables: { id: 3 },
		},
		(error, result) => {
			if ( error ) {
				console.log( error );
				done( error );
			}
			if ( result ) {
				expect( result ).to.haveOwnProperty( 'post' );
				expect( result.post.id ).to.equal( 3 );
				expect( result.post.title ).to.equal( 'three' );
				done();
			}
		})}, 100 );
		setTimeout( () => { SubscriptionServerTests.subscriptionManager.publish(
			'post',
			{ id: 3 },
		)}, 200 );
	}
	// TODO: Finish Testing Subscriptions using Client from subscriptions-transport-ws
}
