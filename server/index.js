const util = require('util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');
const debug   = require('debug')('app:server');
const config = require('../build/config');
const webpackConfig = require('../build/webpack.config.js');

const { port, host } = config;
const server = new WebpackDevServer(
	webpack(webpackConfig),
	webpackConfig.devServer
);

server.listen(port, host, function (err) {
	if (err) { console.log(err); }

	var url = util.format('http://%s:%d', host, port);

	debug('Listening at %s', url);
});
