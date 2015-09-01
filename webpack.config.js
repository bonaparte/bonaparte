module.exports = function(name){
    name = name || require("./package.json").name;
    var ExtractTextPlugin = require("extract-text-webpack-plugin");
    var ExtractCSS = new ExtractTextPlugin(name+".css");
    var ExtractLESS = new ExtractTextPlugin(name+".less");


    return {
        entry: './entry-loader?require("./bonaparte.js").register(); require("./bonaparte.less");!',
        output: {
            path: "./dist",
            filename: name+".js"
        },
        module: {
            loaders: [
                // Extract css files
                {
                    test: /\.css$/,
                    loader: ExtractCSS.extract("style-loader", "css-loader!autoprefixer-loader")
                },
                // Optionally extract less files
                // or any other compile-to-css language
                // {
                //     test: /\.less$/,
                //     loader: "raw-loader"
                // }           
                // Optionally extract less files
                // or any other compile-to-css language
                {
                    test: /\.less$/,
                    loader: ExtractCSS.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
                }            
                // Optionally extract less files
                // or any other compile-to-css language
                // {
                //     test: /\.less$/,
                //     loader: ExtractLESS.extract("raw-loader")
                // }
                // You could also use other loaders the same way. I. e. the autoprefixer-loader
            ]
        },
        // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
        plugins: [
           ExtractCSS,
        ]
    }
}