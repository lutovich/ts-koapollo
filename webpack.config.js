var webpack = require('webpack');

module.exports =  {
	entry: {
		main: './src/client.tsx'
},
	output: {
		filename: 'bundle.js',
		path: __dirname + '/public'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.webpack.js','.web.js','.ts','.tsx','.js']
	},
	module: {
		rules: [
			{ test: /\.tsx?$/,
				loader: 'tslint-loader',
				enforce: 'pre',
				exclude: [ /node_modules/ ] },
			{ test: /\.js/,
				loader: 'source-map-loader',
				enforce: 'pre',
				exclude: [ /node_modules/ ] },
			{ test: /\.tsx?$/,
				loaders: ['react-hot-loader','awesome-typescript-loader'],
				exclude: [ /node_modules/ ] },
			{ test: /\.sass$/,
				loaders: ['style-loader','css-loader','sass-loader'] },
			{ test: /\.json$/,
				loaders: ['json-loader'] },
		]
	},
	externals: {
		'winston': 'require("winston")'
	},
	plugins: [
		// new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),
		// new webpack.optimize.UglifyJsPlugin(),
		// new webpack.optimize.OccurrenceOrderPlugin(),
		// new webpack.optimize.DedupePlugin(),
	]
};
