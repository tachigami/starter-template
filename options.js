'use strict';
/**
 * Содержит настройки сборки. Описание см в README.md
 */
module.exports = {
  enableIntegration: false,
  proxyHost: 'localhost',
  openBrowser: true,
  notifications: true,
  srcDir: 'assets',
  destDir: 'static',
  jpeg: {
    progressive: true,
    max: 90,
  },
  png: {
    lossless: false,
    // lossless
    optipng: {
      optimizationLevel: 3,
      strip: 'all',
    },
    // lossy
    pngquant: {
      quality: [0.6, 0.8],
      speed: 1,
    },
  },
};
