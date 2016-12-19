"use strict";
const graphql_subscriptions_1 = require("graphql-subscriptions");
const schema_1 = require("./schema");
const pubsub = new graphql_subscriptions_1.PubSub();
const subscriptionManager = new graphql_subscriptions_1.SubscriptionManager({
    schema: schema_1.default,
    pubsub,
    setupFunctions: {
        placeholder: () => { return null; },
    },
});
