module.exports =  {
	entry: './src/client.tsx',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/public'
	},
	devtool: 'source-map',
	resolve: {
		extenstions: ['','.webpack.js','.web.js','.ts','.tsx','.js']
	},
	module: {
		loaders: [
			{ test: /\.tsx?$/, loaders: ['react-hot','awesome-typescript-loader'] },
			{ test: /\.sass$/, loaders: ['style','css','sass'] },
			{ test: /\.json$/, loaders: ['json'] },
		],
		preLoaders: [
			{ test: /\.js/, loader: 'source-map-loader' }
		]
	},
	externals: {
		'winston': 'require("winston")'
	}
};
