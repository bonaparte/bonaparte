module.exports = function(name){
    name = name || require("./package.json").name;
    var ExtractTextPlugin = require("extract-text-webpack-plugin");
    var ExtractCSS = new ExtractTextPlugin("bonaparte.css");

    return {
        entry: './bonaparte.build.js',
        output: {
            path: "./dist",
            filename: "bonaparte.js"
        },
        module: {
            loaders: [
                {
                    test: /\.css$/i,
                    exclude : /wsj-fonts\.css$/,
                    loader: ExtractCSS.extract("css-loader!autoprefixer-loader")
                },
                {
                    test: /\.less$/i,
                    loader: ExtractCSS.extract("css-loader!autoprefixer-loader!less-loader")
                },
                {
                    test: /\.scss$/i,
                    loader: ExtractCSS.extract("css-loader!autoprefixer-loader!sass-loader")
                },
                {
                    test: /\.(woff|woff2|eot|ttf)$/i,
                    loader: "file-loader?name=fonts/[name]-[hash].[ext]"
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loader: "file-loader?name=images/[name]-[hash].[ext]"
                },
                {
                    test : /wsj-fonts\.css$/i,
                    loader: ExtractCSS.extract("external-css-loader?name=css/[name].[ext]")
                }
            ],
        },
        plugins: [
           ExtractCSS,
        ]
    }
}();
