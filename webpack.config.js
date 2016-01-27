/**
 * Created by kurpav on 1/21/16.
 */
var path = require("path");
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: "./app/src/js/index.js",
	output: {
		path: __dirname,
		filename: "./app/dist/js/app.js"
	},
	module: {
		loaders: [
			{
				loader: "babel-loader",
				test: path.join(__dirname, "app/src/js"),
				query: {
					presets: "es2015"
				}
			}
		]
	},
	plugins: [
		// Avoid publishing files when compilation fails
		new webpack.NoErrorsPlugin(),
		new CopyWebpackPlugin([
					// Copy directory contents to {output}/to/directory/
					{ from: './app/src/css', to: 'app/dist/css' },
					{ from: './app/src/config', to: 'app/dist/config' },
					{ from: './app/src/assets', to: 'app/dist/assets' },
					{ from: './app/src/js/lib', to: 'app/dist/js' }])
	],
	stats: {
		// Nice colored output
		colors: true
	},
	// Create Sourcemaps for the bundle
	devtool: "source-map"
};