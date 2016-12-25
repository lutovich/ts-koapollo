"use strict";
const graphql_subscriptions_1 = require("graphql-subscriptions");
const graphql_1 = require("graphql");
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
const postType = new graphql_1.GraphQLObjectType({
    name: 'Post',
    fields: {
        id: { type: graphql_1.GraphQLInt },
        title: { type: graphql_1.GraphQLString },
    },
});
const schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: 'Query',
        fields: {
            posts: {
                type: postType,
                args: {
                    id: { type: graphql_1.GraphQLInt },
                },
                resolve: (_, { id }) => {
                    return data[id];
                },
            },
        },
    }),
    subscription: new graphql_1.GraphQLObjectType({
        name: 'Subscription',
        fields: {
            post: {
                type: postType,
                args: {
                    id: { type: graphql_1.GraphQLInt },
                },
                resolve: (_, { id }) => {
                    return data[id];
                },
            },
            postFiltered: {
                type: postType,
                args: {
                    id: { type: graphql_1.GraphQLInt },
                },
                resolve: (_, { id }) => {
                    return data[id];
                },
            },
        },
    }),
});
exports.schema = schema;
const subscriptionManager = new graphql_subscriptions_1.SubscriptionManager({
    schema,
    pubsub: new graphql_subscriptions_1.PubSub(),
    setupFunctions: {
        postFiltered: (options, args) => ({
            postFiltered: {
                filter: (post) => { return !args['id'] || post.id === args['id']; },
            },
        }),
    },
});
exports.subscriptionManager = subscriptionManager;
//# sourceMappingURL=mock-schema.js.map