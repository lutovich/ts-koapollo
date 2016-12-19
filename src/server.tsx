import * as koa from 'koa';
import * as koaStatic from 'koa-static';
import * as proxy from 'koa-proxy';
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

const basePort = process.env.PORT || 3000;
const apiHost = `http://localhost:${basePort + 10}`;
const apiUrl = `${apiHost}/graphql`;
const scriptUrl = `http://localhost:${basePort}/bundle.js`;

const app = new koa();
app.use(koaStatic(path.join(process.cwd(), 'public')));
app.use(
	proxy({
		host: apiUrl,
		match: /^\/(graphi?ql|log(in|out))\//, // Not exactly a regex mastermind but I'm quite proud of this
	}),
);

app.use(function *() {
	let client;
	let props;
	let toRender;

	match({
		routes,
		location: this.originalUrl,
	},
	( error, redirectLocation, renderProps ) => {
		winston.info(`error: ${error}\nredirectLocation: ${redirectLocation}\nrenderProps: ${JSON.stringify(renderProps,null,2)}`);
		if ( error ) {
			this.throw( error.message, 500 );
		} else if ( redirectLocation ) {
			this.redirect( redirectLocation.pathname + redirectLocation.search );
		} else if ( renderProps ) {
			props = renderProps;
			client = createApolloClient({
				ssrMode: true,
				networkInterface: createNetworkInterface({
					uri: apiUrl,
					opts: {
						credentials: 'same-origin',
						headers: this.headers,
					},
				}),
			});

			const component = (
				<ApolloProvider client={client}>
					<RouterContext {...props} />
				</ApolloProvider>
			);

			let content = function *() { return renderToStringWithData( component ); }();

			const html = (
				<Html
					children={content}
					scriptUrl={scriptUrl}
				/>
			);

			this.body = `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`;
		} else {
			this.throw('Not Found', 404);
		}
	});
});

app.listen(basePort, () => winston.info(`App Server is now listening on http://localhost:${basePort}`));

// https://medium.com/@arpith/server-rendering-with-react-router-6ad13d71406e#.v9occ6xjf
// https://github.com/apollostack/GitHunt-React/blob/master/ui/server.js
