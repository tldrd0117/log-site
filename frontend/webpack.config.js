const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
	const prod = argv.mode === 'production';

	return {
        
		mode: prod ? 'production' : 'development',
		devtool: prod ? 'hidden-source-map' : 'source-map',//'eval',
		entry: './src/index.tsx',
		output: {
			path: path.join(__dirname, '/dist'),
			filename: '[name].js',
		},
		devServer: {
            historyApiFallback: true,
			port: 3001,
			hot: true,
		},
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: { '@codemirror/state': __dirname + '/node_modules/@codemirror/state/dist/index.cjs', },
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: ['babel-loader', 'ts-loader'],
				},
			],
		},
		plugins: [
			new webpack.ProvidePlugin({
				React: 'react',
			}),
			new HtmlWebpackPlugin({
				template: './public/index.html',
				minify:
					process.env.NODE_ENV === 'production'
						? {
								collapseWhitespace: true, // 빈칸 제거
								removeComments: true, // 주석 제거
						  }
						: false,
			}),
			new CleanWebpackPlugin(),
		],
	};
};
