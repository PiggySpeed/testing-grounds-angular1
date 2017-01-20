import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const PATHS = {
  entry: path.join(__dirname, 'src/app/app.js'),
  path: path.join(__dirname, 'dist'),
  publicPath: 'http://localhost:8080/'
};
const LAUNCH_COMMAND = process.env.npm_lifecycle_event;
const isProd = LAUNCH_COMMAND === 'production';

// Base Config
const base = {
  entry: {
    app: PATHS.entry
  },
  output: {
    path: PATHS.path,
    publicPath: isProd ? '/' : PATHS.publicPath,
    filename: 'bundle.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            ['es2015', { modules: false }],
            'stage-0'
          ]
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }, //needs to include node_modules to work
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  devServer: {
    contentBase: './src/public',
    stats: 'minimal'
  }
};

// Plugins
const prodPlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
});
const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/public/index.html',
  inject: 'body'
});

const developmentConfig = {
  devtool: 'inline-source-map',
  plugins: [htmlPlugin]
};
const prodConfig = {
  plugins: [prodPlugin, htmlPlugin]
};

// Main Export
export default Object.assign({}, base,
  isProd === true ? prodConfig : developmentConfig
)