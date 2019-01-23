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
  destDir: 'public',
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
      quality: 80,
      speed: 1,
    },
  },
};
