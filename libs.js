'use strict';
/**
 * Содержит пути к библиотекам, установленных с помощью Yarn и компилирующихся в vendor.min.(css|js)
 */
module.exports = {
  styles: {
    css: [
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
    ],
    sass: [
      'node_modules/bootstrap-4-grid/scss/grid.scss',
    ],
  },
  scripts: [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
  ],
};
