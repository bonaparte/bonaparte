var pkg = require("./package.json");

module.exports = require("bonaparte/webpack.config.js")(pkg.name);