const path = require('path');
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    // 将entry指向examples
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    }
}
