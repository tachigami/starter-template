Это стартовый шаблон, который помогает ускорить начало работы над вёрсткой страниц.
---
Все файлы, скомпилированые и оптимизированные, предназначеные для дальнейшего переноса на хостинг или cms располагаются в `public/`,
а исходный код в `assets/`. Действия для работы над исходным кодом описаны ниже:

##### Описание:
* Для сборки используется gulp
* Для подключения сторонних библеотек используется yarn
* Имеется поддержка BrowserSync для PHP, необходим локально установленный PHP
* Autoprefixer
* Минификация JS и CSS
* Поддержка SASS
* Оптимизация изображений
* Простой шаблонизатор для HTML [gulp-file-include](https://www.npmjs.com/package/gulp-file-include)

##### Начало работы
Перед началом работы необходимо установить Nodejs 7 с [официального сайта Node](https://nodejs.org/en/download/)
1. Установить gulp
```bash
sudo npm i -g gulp
```
2. Установить yarn подходящим способом для своей ОС с [официального сайта Yarn](https://yarnpkg.com/en/docs/install)
3. Установит зависимости командой
```bash
yarn
```

##### Пример использования:
* `gulp` или `gulp build` - Запускет сборку
* `gulp production` - Запускает оптимизированную сборку
* `gulp watch` - Запускает сборку и слежение за изменениями файлов
* `gulp live` - Запускает BrowserSync
* `gulp php` - Запускает BrowserSync с PHP
* `gulp clean` - Очищает папку */public*, если **production=true** очищает только *css, js, fonts, img*
* `yarn add [название библиотеки]` - Добавление зависимости
* `yarn remove [название библиотеки]` - Удаление зависимости
* `yarn upgrade` - Обновление всех или отдельной зависимостей

##### Конфигурация
В файле `libs.js` указываются пути к библиотекам, которые можно установить с помощью Yarn.

```text
{
    sass: [
        './node_modules/bootstrap-sass-grid/sass/bootstrap-sass-grid.scss'
    ],
    css: [
        './node_modules/normalize.css/normalize.css'
    ],
    js: [
        './node_modules/jquery/dist/jquery.min.js'
    ]
}
```

В файле `options.js` содержатся настройки сборки.
```text
{
    useTemplates: true,
    production: false,
    openBrowser: true,
    notifications: true,
    host: '127.0.0.1',
    phpProxyPort: 8888,
    srcDir: 'assets',
    destDir: 'public'
}
```
* **useTemplates** - Включает компилирование HTML шаблонов их перемещение и отчистку пути их компилирование `destDir`, необходима, при переносе сборки на продакшн или когда не нужна компиляция шаблонов, а только стилей, скриптов и картинок.
* **production** - Выключает то, что не требуется на продакшене, напр. создание source-map для стилей для уменьшения размера конечных файлов. Для разового запуска существует команда `gulp production`
* **openBrowser** - Открывает окно браузера при запуске browser-sync.
* **notifications** - Выводит уведомления о выполнении определенных задач.
* **phpProxyHost** - Адрес на котором работает сервер php.
* **phpProxyPort** - Порт на котором BrowserSync будет обращаться к серверу PHP.
* **srcDir** - Папка с исходниками.
* **destDir** - Папка со скомпилированными.