var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports =  {
    entry: './bonaparte.build.js',
    output: {
        path: "./dist",
        filename: "bonaparte.js"
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
       new ExtractTextPlugin("bonaparte.css"),
			 new webpack.optimize.DedupePlugin()
    ]
};
