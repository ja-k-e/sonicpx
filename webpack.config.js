// webpack.config.js

module.exports = {
  output: {
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [['latest', { modules: false }]]
        }
      }
    ]
  },
  resolve: {
    alias: {
      config: `${__dirname}/config/${process.env.NODE_ENV}`,
      globals: `${__dirname}/config/globals`,
      'firebase-settings': `${__dirname}/config/firebase-settings`
    }
  }
};
