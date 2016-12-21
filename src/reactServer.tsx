import * as koa from 'koa';
import * as koaStatic from 'koa-better-static';
import * as koaBody from 'koa-bodyparser';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as winston from 'winston';
import { createNetworkInterface } from 'apollo-client';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { match, RouterContext } from 'react-router';
import * as path from 'path';

import routes from './routes';
import Html from './routes/Html';
import createApolloClient from './helpers/create-apollo-client';

import config from './config';

export default class ReactServer {
	server: koa;

	constructor ( port: number, callback?: Function, apiPort?: number ) {

		const basePort = port;
		apiPort = apiPort || config.graphQLServer.PORT;
		const apiHost = `http://localhost:${ apiPort }`;
		const apiUrl = `${ apiHost }/graphql`;
		const scriptUrl = `http://localhost:${ basePort }/bundle.js`;

		this.server = new koa();
		this.server.use( koaStatic( '/public' ) );

		this.server.use( async ( ctx: koa.Context, next: Function ) => {
			console.log('Called React Router Middleware');

			let client;
			let props;
			let toRender;

			match({
				routes,
				location: ctx.originalUrl,
			},
			async ( error, redirectLocation, renderProps ) => {
				if ( error ) {
					console.log( error );
					ctx.body = { message: error.message };
					ctx.status = 500;
				} else if ( redirectLocation ) {
					ctx.redirect( redirectLocation.pathname + redirectLocation.search );
				} else if ( renderProps ) {
					props = renderProps;
					client = createApolloClient({
						ssrMode: true,
						networkInterface: createNetworkInterface({
							uri: apiUrl,
							opts: {
								credentials: 'same-origin',
								headers: ctx.headers,
							},
						}),
					});

					const component = (
						<ApolloProvider client={client}>
							<RouterContext {...props} />
						</ApolloProvider>
					);

					let content = await renderToStringWithData( component );

					const html = (
						<Html
							children={content}
							scriptUrl={scriptUrl}
						/>
					);

					ctx.body = `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`;
				} else {
					ctx.body = { message: 'Page not found' };
					ctx.status = 404;
				}
				return;
			});
		});

		this.server.listen( port, callback() );
	}
}
// https://medium.com/@arpith/server-rendering-with-react-router-6ad13d71406e#.v9occ6xjf
// https://github.com/apollostack/GitHunt-React/blob/master/ui/server.js
