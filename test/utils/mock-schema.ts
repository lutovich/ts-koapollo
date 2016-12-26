import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { PubSub, SubscriptionManager } from 'graphql-subscriptions';

import { SubscriptionOptions } from 'graphql-subscriptions/dist/pubsub';
import { SubscribeMessage } from 'subscriptions-transport-ws/dist/server';

import {
	graphql,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
	GraphQLInt,
} from 'graphql';

import winston from 'winston';

// TODO: Add subscriptions function call in mutation calls

/* tslint:disable:object-literal-key-quotes */
const data = {
	1: {
		'id': 1,
		'title': 'one',
	},
	2: {
		'id': 2,
		'title': 'two',
	},
	3: {
		'id': 3,
		'title': 'three',
	},
};
/* tslint:enable:object-literal-key-quotes */
/* tslint:disable:object-literal-sort-keys */
const postType = new GraphQLObjectType({
	name: 'Post',
	fields: {
		id: { type: GraphQLInt },
		title: { type: GraphQLString },
	},
});

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: {
			posts: {
				type: postType,
				args: {
					id: { type: GraphQLInt },
				},
				resolve: (_, {id}) => {
					return data[id];
				},
			},
		},
	}),
	subscription: new GraphQLObjectType({
		name: 'Subscription',
		fields: {
			post: {
				type: postType,
				args: {
					id: { type: GraphQLInt },
				},
				resolve: (_, {id}) => {
					return data[id];
				},
			},
			postFiltered: {
				type: postType,
				args: {
					id: { type: GraphQLInt },
				},
				resolve: (_, {id}) => {
					return data[id];
				},
			},
		},
	}),
});

const subscriptionManager = new SubscriptionManager({
	schema,
	pubsub: new PubSub(),
	setupFunctions: {
		postFiltered: ( options: SubscriptionOptions, args: { [key: string]: any } ) => ({
			postFiltered: {
				filter: ( post: any ) => { return !args['id'] || post.id === args['id']; }, // tslint:disable-line:no-string-literal
			},
		}),
	},
});

export { schema, subscriptionManager };
