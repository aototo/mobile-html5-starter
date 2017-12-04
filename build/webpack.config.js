/* eslint-disable */

const webpack           = require('webpack');
const debug             = require('debug')('app:webpack:config');
const path              = require('path');
const glob              = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const __DEV__           = process.env.NODE_ENV == 'development';
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config            = require('./config');
const { port, host, is_cdn } = config;

// --------------------------
// Creact app path
// --------------------------
const path_base      = path.resolve(__dirname, '..');
const bundle_path    = path.resolve(path_base, 'dist');
const app_index_path = `${path_base}/app/app.js`;
const app_test_path  = `${path_base}/app/test.js`;
const app_path       = path.resolve(path_base, 'app')


// --------------------------
// util app path
// --------------------------
function create_folder_path_for_app(folder_name) {
  return path.resolve(app_path, folder_name)
}

// --------------------------
// Creating configuration
// --------------------------
debug('Creating configuration.')
const webpackConfig = {
  name: 'aframe-client',
  target: 'web',
  devtool: 'source-map',
  module: {},
  resolve: {
    root: path_base,
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      imageBase: create_folder_path_for_app('assets/images'), //图片alias
    },
  },
  node: {
    fs: "empty",
    tls: "empty",
  }
}

// --------------------------
// Entry Points
// --------------------------
webpackConfig.entry = {
	app: __DEV__
      ? [app_index_path].concat(['webpack/hot/only-dev-server', `webpack-dev-server/client?http://${host}:${port}/`])
      : app_index_path,
};


// // 获取所有入口文件
// var getEntry = function(globPath) {
//     var entries = {};
//
//     console.log(glob.sync(globPath));
//     glob.sync(globPath).forEach( (entry) => {
//       console.log(entry);
//     });
//     return entries;
// };
//
// getEntry('./app/**.js')


// --------------------------
// Bundle Output
// --------------------------
const output_name    = 'js/[name].[hash].js';

webpackConfig.output = {
	filename: output_name,
	path    : bundle_path,
	publicPath: is_cdn ? config.cdn_url : './', //可配置cdn
}



// ------------------------------------
// Loaders
// ------------------------------------
const BASE_CSS_LOADER = 'css-loader?sourceMap&-minimize'

webpackConfig.module.loaders = [];
webpackConfig.module.loaders.push({
	test: /\.js$/,
	exclude: /node_modules/,
	loaders: [
		'babel',
	]
});

//'webpack-module-hot-accept'
if (!__DEV__) {

    // ------------------------------------
    //  build 之后的路径问题，图片的文件目录 ../
    //  app.js
    //  ------ assets
    //  ------     > images
    //  ------     > css
    //  ------     > js
    //  ------------------------------------

    webpackConfig.module.loaders.push({
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                'style',
                `${BASE_CSS_LOADER}!postcss!sass-loader?sourceMap`,
                {'publicPath': is_cdn ? config.cdn_url : '../'
            })
    });

} else {
	webpackConfig.module.loaders.push({
		test: /\.scss$/,
		loaders: [
			'style-loader',
			BASE_CSS_LOADER,
			'postcss-loader',
			'sass-loader?sourceMap'
		]
	});
}


webpackConfig.module.loaders.push({
	test: /\.css$/,
	exclude: null,
	loaders: [
		'style-loader',
		BASE_CSS_LOADER,
		'postcss-loader'
	]
});


// ------------------------------------
// images assets
// https://github.com/webpack-contrib/file-loader
// ------------------------------------

webpackConfig.module.loaders.push(
	{
		test: /\.(png|jpg|gif)$/,
		loader: 'url-loader?limit=10000&name=images/[hash][name].[ext]'
	},
	{
		test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
		loader: 'file-loader?name=fonts/[name].[ext]'
	}
);

// 下面是给图片添加cdn的
// webpackConfig.module.loaders.push({
//   test: /\.(png|jpg|gif)$/,
//   loader: 'url-loader?limit=10000&name=images/[hash][name].[ext]&publicPath=http://static.cdn.com/'
// })

//-----------------------------------

webpackConfig.module.loaders.push({
  // html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
  // 比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
	test: /\.html$/,
	loader: 'html?attrs=img:src img:data-src'
})

//include style file Path
webpackConfig.sassLoader = {
	includePaths: create_folder_path_for_app('style')
}

webpackConfig.postcss = [
	require('autoprefixer')
]

// ------------------------------------
// plugins
// ------------------------------------
const html_path = path.resolve(path_base, 'app/index.html');

// HtmlWebpackPlugin
webpackConfig.plugins = [
	new HtmlWebpackPlugin({
		title: 'My App',
		template: html_path,
		filename: 'index.html',
		chunks: ['app'],
		showErrors: true,
	}),

  // 静态资源cope
  // new CopyWebpackPlugin([
  //   { from: create_folder_path_for_app('assets/images'), to: bundle_path + '/images' },
  // ])
];

// DefinePlugin
// 在编译的时候设置全局变量
webpackConfig.plugins.push(
  new webpack.DefinePlugin(config.globals)
)

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')

  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}


// ------------------------------------
// externals
// ------------------------------------
webpackConfig.externals = {
  jquery: "jQuery",
}


// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809

if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const first = loader.loaders[0]
    const rest = loader.loaders.slice(1)
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  })

  // ExtractTextPlugin.extract({
  //   publicPath: '../',
  // })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('css/[contenthash].css', {
      allChunks: true,
    })
  )
}


// ------------------------------------
// devServer
// ------------------------------------
webpackConfig.devServer = {
    contentBase: bundle_path,
    hot: false,
    noInfo: true,
    inline: true,
    stats: { colors: true },
    historyApiFallback: true
}

module.exports = webpackConfig;
