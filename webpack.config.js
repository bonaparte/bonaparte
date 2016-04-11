var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports =  {
  entry: {
		"bonaparte" : './packages/bonaparte/bonaparte.build.js',
		"bonaparte-button" : [ "./packages/bonaparte-button/bonaparte.build.js" ],
		"bonaparte-collapsible" : [ "./packages/bonaparte-collapsible/bonaparte.build.js" ],
		"bonaparte-draggable" : [ "./packages/bonaparte-draggable/bonaparte.build.js" ],
		"bonaparte-dropdown" : [ "./packages/bonaparte-dropdown/bonaparte.build.js" ],
		"bonaparte-panel" : [ "./packages/bonaparte-panel/bonaparte.build.js" ],
		"bonaparte-scroll" : [ "./packages/bonaparte-scroll/bonaparte.build.js" ],
		"bonaparte-sidebar" : [ "./packages/bonaparte-sidebar/bonaparte.build.js" ],
		"bonaparte-toolbar" : [ "./packages/bonaparte-toolbar/bonaparte.build.js" ]
	},
  output: {
    path: "./dist",
    filename: "[name]/bonaparte.js"
  },
  module: {
    loaders: [
      {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract("css-loader!postcss-loader")
      },
      {
        test: /\.less$/i,
        loader: ExtractTextPlugin.extract("css-loader!postcss-loader!less-loader")
      },
      {
        test: /\.scss$/i,
        loader: ExtractTextPlugin.extract("css-loader!postcss-loader!sass-loader")
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        loader: "file-loader?name=fonts/[name]-[hash].[ext]"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader?name=images/[name]-[hash].[ext]"
      }
    ]
  },
	postcss: function(){
		return [
			require('autoprefixer'),
			require('postcss-discard-duplicates')
		];
	},
  plugins: [
    new ExtractTextPlugin("[name]/bonaparte.css"),
		new webpack.optimize.DedupePlugin()
  ]
};
