module.exports = {
  mode: 'production',
  entry: './game.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.ts' ],
  },
  output: {
    filename: 'game.js',
    path: __dirname
  }
};
