"use strict";
const graphql_tools_1 = require("graphql-tools");
const winston_1 = require("winston");
const schemaString = `type Author {
	  id: Int! # the ! means that every author object _must_ have an id
	  firstName: String
	  lastName: String
	  posts: [Post] # the list of Posts by this author
	}

	type Post {
	  id: Int!
	  title: String
	  author: Author
	  votes: Int
	}

	# the schema allows the following query:
	type Query {
	  posts: [Post]
	}

	# this schema allows the following mutation:
	type Mutation {
	  upvotePost (
	    postId: Int!
	  ): Post
	}

	# we need to tell the server which types represent the root query
	# and root mutation types. We call them RootQuery and RootMutation by convention.
	schema {
	  query: Query
	  mutation: Mutation
	}`;
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: schemaString,
    logger: {
        log: (e) => winston_1.default.error('Schema Error:', e),
    },
});
graphql_tools_1.addMockFunctionsToSchema({ schema });
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = schema;
//# sourceMappingURL=mock-schema.js.map