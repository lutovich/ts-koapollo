import * as koa from 'koa';
import * as koaBody from 'koa-bodyparser';
import * as koaRouter from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';
import { GraphQLSchema } from 'graphql';

export default class GraphQLServer {
	server: koa;
	router: koaRouter;
	constructor ( port: number, callback: Function, schema: GraphQLSchema ) {
		this.server = new koa();
		this.router = new koaRouter();

		this.server.use(koaBody());

		// Create GraphQL endpoint route
		this.router.post(
			'/graphql',
			graphqlKoa({
				schema,
			}),
		);

		// Create GraphiQL route
		this.router.get('/graphiql', graphiqlKoa({
			endpointURL: '/graphql',
		}));
		this.server.use(this.router.routes());
		this.server.use(this.router.allowedMethods());

		// Start it up!
		this.server.listen( port, callback() );
	}
}
