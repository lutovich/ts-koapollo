import * as React from 'react';

const basePort = process.env.PORT || 3000;

interface Props {
	scriptUrl: any
};
interface State {};

export default class Html extends React.Component<Props, State> {
	public render () {
		return(
			<html lang='en'>
			<head>
				<meta charSet='utf8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<title>Koapollo</title>
			</head>
			<body>
				<div id='content'>
					{this.props.children}
				</div>
				<script src={this.props.scriptUrl} charSet='UTF-8' />
			</body>
			</html>
		);
	}
}
