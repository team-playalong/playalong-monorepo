var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpackConfig = require('./webpack.config');
var CopyWebpackPlugin = require('copy-webpack-plugin');

webpackConfig.devtool = 'eval';

// Move templates to dist folder
// TODO - check how to make this part of the bundle
webpackConfig.plugins.push(new CopyWebpackPlugin([
	{ from: '**/*.html' },
	{ from: '**/*.png' },
	{ from: '**/*.svg' },
]));

webpackConfig.plugins.push(new CleanWebpackPlugin(['dist']));

webpackConfig.output = {
	path: path.join(__dirname, 'dist'),
	filename: '[name].[chunkhash].js',
};

webpackConfig.optimization = {
	splitChunks: {
		chunks: 'async',
		minSize: 30000,
		maxSize: 0,
		minChunks: 1,
		maxAsyncRequests: 5,
		maxInitialRequests: 3,
		automaticNameDelimiter: '~',
		name: true,
		cacheGroups: {
			vendors: {
				test: /[\\/]node_modules[\\/]/,
				priority: -10
			},
			default: {
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true
			}
		}
	},
	minimizer: [
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					arrows: false,
					booleans: false,
					// cascade: false,
					collapse_vars: false,
					comparisons: false,
					computed_props: false,
					hoist_funs: false,
					hoist_props: false,
					hoist_vars: false,
					if_return: false,
					inline: false,
					join_vars: false,
					keep_infinity: true,
					loops: false,
					negate_iife: false,
					properties: false,
					reduce_funcs: false,
					reduce_vars: false,
					sequences: false,
					side_effects: false,
					switches: false,
					top_retain: false,
					toplevel: false,
					typeofs: false,
					unused: false,

					// Switch off all types of compression except those needed to convince
					// react-devtools that we're using a production build
					conditionals: true,
					dead_code: true,
					evaluate: true,
				},
				mangle: true,
			},
		}),
	]
};

module.exports = webpackConfig;
