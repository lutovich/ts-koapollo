import * as React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

interface Props {};
interface State {};

class Layout extends React.Component<Props, State>  {
	public render() {
		return(
			<div className='Layout'>
				Layout
			</div>
		);
	}
}

class Path extends React.Component<Props, State>  {
	public render() {
		return(
			<div className='Path'>
				Layout
			</div>
		);
	}
}

const routes = (
	<Route path='/' component={Layout}>
		<Route path='/path' component={Path} />
		<Redirect from='/redirect' to='/' />
	</Route>
);

export default routes;
