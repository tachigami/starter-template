'use strict';
/**
 * Содержит пути к библиотекам, установленных с помощью Yarn и компилирующихся в vendor.min.(css|js)
 */
module.exports = {
    styles: [
    	'node_modules/bootstrap-sass-grid/sass/bootstrap-sass-grid.scss',
    ],
    scripts: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery-migrate/dist/jquery-migrate.min.js',
    ]
}