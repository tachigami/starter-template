'use strict';
/**
 * Содержит настройки сборки. Описание см в README.md
 */
module.exports = {
    useTemplates: true,
    production: false,
    openBrowser: true,
    notifications: false,
    phpProxyHost: '127.0.0.1',
    phpProxyPort: 8888,
    srcDir: 'assets',
    destDir: 'public',
    jpeg: {
        progressive: true,
        max: 90
    },
    png: {
        lossless: true,
        // lossless
        optipng: {
            optimizationLevel: 3,
            strip: 'all'
        },
        // lossy
        pngquant: {
            quality: 80,
            speed: 1
        }
    }
};