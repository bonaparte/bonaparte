module.exports = function(name){


    // ### poyfill ###
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
    if (!String.prototype.startsWith) {
      String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
      };
    }
    // ### poyfill end ###

    String.prototype.capitalize = function(){
        return this.toLowerCase().replace( /\b\w/g, function (m) {
            return m.toUpperCase();
        });
    };

    var packageJSON = require("./package.json");
    var fs = require('fs');

    name = name || packageJSON.name;

    var ExtractTextPlugin = require("extract-text-webpack-plugin");
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    var ExtractCSS = new ExtractTextPlugin("./assets/css/" + name + ".css");

    var components = [];

    var config = {
        entry: './bonaparte.build.js',
        output: {
            path: "./public",
            filename: "./assets/js/" + name + ".js"
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
                    loader: "file-loader?name=../fonts/[name]-[hash].[ext]"
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loader: "file-loader?name=../images/[name]-[hash].[ext]"
                },
                {
                    test : /wsj-fonts\.css$/i,
                    loader: ExtractCSS.extract("external-css-loader?name=../fonts/[name].[ext]")
                }
            ],
        },
        plugins: [
           ExtractCSS
        ]
    }

    Object.keys(packageJSON.dependencies).forEach(function(key) {
        if (key.startsWith("bonaparte-")) {
            var gitURL = "http://" + packageJSON.dependencies[key].split('@')[1].split('.git')[0],
                loaclPath = __dirname + "/node_modules/" + key + '/',
                title = key.split('-')[1].capitalize(),
                html = '<div>NO Example found</div>',
                hasExample = false;

            if (fs.existsSync(loaclPath + "examples/index.html")) {
                html = fs.readFileSync(loaclPath + "examples/index.html", 'utf8');
                hasExample = true;
            }
            config.plugins.push(new HtmlWebpackPlugin({
                title: title,
                filename: 'examples/' + key + '.html',
                template: 'src/templates/example.html', // Load a custom template
                inject: 'body', // Inject all scripts into the body
                content: html,
                gutUrl: gitURL,
                components: components

            }))

            components.push({
                name: title + ' Example',
                url: './' + key + '.html',
                hasExample: hasExample
            })
        }
    });

    config.plugins.push(new HtmlWebpackPlugin({
        filename: 'examples/index.html',
        template: 'src/templates/index.html', // Load a custom template
        inject: 'body', // Inject all scripts into the body,
        components: components
    }))

    return config;
}();
