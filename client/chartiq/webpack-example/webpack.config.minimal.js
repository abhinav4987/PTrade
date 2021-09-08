/*
 * This configuration is meant as an illustration of how to load helloworld in webpack.
 */
/* eslint-env node */
const path = require("path");
const webpack = require("webpack");
const CssPlugin = require("extract-css-chunks-webpack-plugin"); // used for packaging css into bundles
const HtmlWebpackPlugin = require("html-webpack-plugin"); // used to load html
const defaultDir = path.join(__dirname, "../");
const env = process.env.NODE_ENV || "production";
module.exports = {
	entry: "./src/sample-template-webpack-minimal.js",
	mode: env,
	module: {
		/**
		 * Webpack uses loaders to handle files types other than JavaScript
		 * This section is where we configure all of the loaders used to it easy to consume ChartIQ
		 * These loaders will grab any file that matches the test in the dependency graph created from an entry.
		 * Read more about loaders in webpack:
		 * https://webpack.js.org/concepts/#loaders
		 */
		rules: [
			{
				/**
				 * Tests any file in the bundle for .scss or .css extension using the scss-loader or secondarily the css-loader
				 * Use it for loading any styles in the dependency graph of your bundle.
				 * By default it will load SASS files and bundle them and check for CSS files.
				 * The options object sets a public path where you can find the output.
				 * Read more about sass-loader:
				 * https://webpack.js.org/loaders/sass-loader/
				 * Read more about css-loader:
				 * https://webpack.js.org/loaders/css-loader/
				 */
				test: /stx-chart.css$/,
				use: [
					{ loader: CssPlugin.loader, options: { publicPath: "css/" } },
					"css-loader"
				]
			},
			{
				/**
				 * Tests any file for a variety of different file endings using file-loader
				 * This loader allows you to include a variety of file types in your bundle, it's very useful for iamges.
				 * It is used for packaging imported images and images in stylesheets when referenced with url() in setting a CSS property value (both CSS and SCSS).
				 * The options object sets a public path where you can find the output.
				 * Read more about file-loader:
				 * https://webpack.js.org/loaders/file-loader/
				 */
				test: /\.(jpg|gif|png|svg|cur)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: function (url, resourcePath, context) {
								// if folder named "images", asset is loaded outside of css.
								return (
									"./" +
									(/images/.test(resourcePath) ? "" : "css/") +
									"img/" +
									url
								);
							},
							publicPath: "img/"
						}
					}
				]
			}
		]
	},
	output: {
		chunkFilename: "js/chartiq-[name].js",
		filename: "js/chartiq-core.js",
		path: path.resolve("dist")
	},
	plugins: [
		/***
		 * Extracts all of our CSS and SCSS bundles and converts them into one unified stylesheet output.
		 * We use the extract-css-chunks-plugin for the benefits it has like Hot Module Reloading
		 * Read more about the Extract CSS Chunks Plugin:
		 * https://www.npmjs.com/package/extract-css-chunks-webpack-plugin
		 */
		new CssPlugin({
			filename: "./css/chartiq.css"
		}),
		/**
		 * Generates an HTML file for your bundle and inserts the output files into it with script tags.
		 * By using the HTML Plugin you can create a fresh copy of your HTML page on each build,
		 * this allows you to serve the entire output of /dist/ instead of needing to reference files from /dist/ in your index.html
		 * Read more about the HTML Plugin:
		 * https://webpack.js.org/plugins/html-webpack-plugin/
		 */
		new HtmlWebpackPlugin({ title: "" }),
		/**
		 * Removes code from final build.  Specifically, removes auto-initialize so features can be tree-shaken.
		 */
		new webpack.DefinePlugin({
			__TREE_SHAKE__: JSON.stringify(env === "production")
		})
		//new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)  // awesome tool for inspecting your bundle
	],
	resolve: {
		/**
		 * If you're not using ChartIQ in a tarball format readable by NPM then you'll need to inform Webpack where the files are located
		 * This alias tells webpack to make these files and folders available for anything any file that needs them in the dependency graph.
		 */
		alias: {
			chartiq: defaultDir
		}
	}
};
