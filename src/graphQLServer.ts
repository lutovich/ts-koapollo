import * as koa from 'koa';
import * as koaBody from 'koa-bodyparser';
import * as koaRouter from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';
import { GraphQLSchema } from 'graphql';

export default async function graphqlServer ( port: number, callback: Function, schema: GraphQLSchema ) {
	const gql = new koa();
	const router = new koaRouter();

	gql.use(koaBody());

	router.post('/graphql', graphqlKoa({ schema }));
	router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql'}));
	gql.use(router.routes());
	gql.use(router.allowedMethods());

	gql.listen( port, callback() );
}
