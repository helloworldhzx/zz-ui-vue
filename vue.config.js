const path = require('path');

module.exports = {
    // 将entry指向examples
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
        .set('zz-ui', path.resolve(__dirname, './'))
    }
}
