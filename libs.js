'use strict';
/**
 * Содержит пути к библиотекам, установленных с помощью Yarn и компилирующихся в vendor.min.(css|js)
 */
module.exports = {
    sass: [
        './node_modules/bootstrap-sass-grid/sass/bootstrap-sass-grid.scss',
    ],
    css: [
        './node_modules/normalize.css/normalize.css',
    ],
    js: [
        './node_modules/jquery/dist/jquery.min.js',
    ]
}