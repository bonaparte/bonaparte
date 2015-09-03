module.exports = function(name){
    name = name || require("./package.json").name;
    var ExtractTextPlugin = require("extract-text-webpack-plugin");
    var ExtractCSS = new ExtractTextPlugin(name+".css");

    var entry = [
        'var tag = require("optional?./bonaparte.js¿");',
        '((typeof tag === "object" || typeof tag === "function") && typeof tag.register === "function") && tag.register();',
        'require("optional?./bonaparte.less¿optional?./bonaparte.scss¿optional?./bonaparte.sass¿optional?./bonaparte.css¿");'
    ].join("\n");

    return {
        entry: 'optional?./bonaparte.build.js!parse?'+entry+'!',
        entry: './bonaparte.build.js',
        output: {
            path: "./dist",
            filename: name+".js"
        },
        module: {
            preLoaders : [
                {
                    test: /.*/,
                    loader : "include-loader"
                }
            ],
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractCSS.extract("css-loader!autoprefixer-loader")
                },
                {
                    test: /\.less$/,
                    loader: ExtractCSS.extract("css-loader!autoprefixer-loader!less-loader")
                },
                {
                    test: /\.scss$/,
                    loader: ExtractCSS.extract("css-loader!autoprefixer-loader!sass-loader")
                }
            ]
        },
        // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
        plugins: [
           ExtractCSS,
        ]
    }
}