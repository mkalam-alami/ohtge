const path = require('path');

module.exports = {
  mode: 'production',
  entry: './ohtge.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.css' ]
  },
  output: {
    filename: 'ohtge.js',
    path: path.resolve(__dirname, '../dist')
  }
};
