# [Шаблон для сборки HTML страниц при помощи Gulp](https://github.com/TeroBlaZe/starter-template)

**Внимание! Данный проект больше не поддерживается. Альтернатива с поддержкой webpack и es6: https://gitlab.com/Bronner/encore-demo-template**

Этот проект предназначен для быстрой и удобной разработки современных, адаптивных и оптимизированных HTML страниц.

Процесс сборки построен таким образом, что позволяет с легкостью переносить вёрстку на любой фреймворк или CMS. Учтены многие аспекты совместимости с различными подходами и инструментами разработки.


* Исходный код: [https://github.com/TeroBlaZe/starter-template](https://github.com/TeroBlaZe/starter-template)
---

## Возможности
* Сборка при помощи [Gulp](https://gulpjs.com)
* Подключение любых библиотек из репозиториев NPM при помощи [Yarn](https://yarnpkg.com)
* Живая перезагрузка страницы с помощью [BrowserSync](https://browsersync.io), даже если сайт уже работает на PHP.
* [Source-Maps](https://github.com/gulp-sourcemaps/gulp-sourcemaps)
* [Auto-Prefixer](https://github.com/sindresorhus/gulp-autoprefixer)
* Сборка и минификация sass, js и css
* Настраиваемая оптимизация изображений
* Простой шаблонизатор для HTML [gulp-file-include](https://www.npmjs.com/package/gulp-file-include)
* Предустановленые JQuery, FancyBox, Bootstrap 4 Grid

## Начало работы
Перед началом работы необходимо установить последнюю версию Node и NPM с [официального сайта Node](https://nodejs.org/en/download/)
1. Установить gulp
    ```bash
    sudo npm i -g gulp-cli
    ```
2. Установить Yarn подходящим способом для своей ОС с [официального сайта Yarn](https://yarnpkg.com/en/docs/install)
3. Установить зависимости командой
    ```bash
    yarn
    ```
4. Запустить BrowserSync, начать работу
    ```
    gulp live
    ```

## Структура
Исходный код расположен в директории `assets`.
Директория `static` содержит минифицированные версии файлов, создаваемые при выполнении команды `gulp`


## Пример использования Gulp:
* `gulp` - Запускет полную сборку (стили, скрипты, шрифты, изображения и т.д)
* `gulp watch` - Запускает слежение за изменениями файлов, без использования BrowserSync
* `gulp live` - Запускает BrowserSync для обновления страницы в реальном времени

Так же возможен запуск отдельных задач
* `gulp assets` - Собирает assets проекта
* `gulp vendor` - Собирает библиотеки vendor
* `gulp images` - Собирает изображения assets
* `gulp styles` - Собирает стили assets
* `gulp scripts` - Собирает скрипты assets
* `gulp fonts` - Собирает шрифты assets
* `gulp html` - Собирает шаблон assets

## Пример использования Yarn:
* `yarn add [название библиотеки]` - Добавление библиотеки
* `yarn remove [название библиотеки]` - Удаление библиотеки
* `yarn upgrade` - Обновление всех или отдельной зависимостей


## Подключение библиотек
Ручное изменение файла package.json, использование dist-версий и отдельных файлов библитек **НЕ РЕКОМЕНДУЕТСЯ**

Для разработки рекомендуется подключать библиотеки при помощи Yarn. При этом нет необходимости копировать файлы библиотек
из директории `node_modules`, вместо копирования нужно подключать их напрямую из этой директории.
В файле `libs.js` указываются пути к библиотекам.

```js
{
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
}
```

### Подключение старой или отсутствующей в npm библиотеки вручную (не рекомендуется)
Хотя этот способ не так актуален для новых проектов, но может пригодиться для переноса legacy проектов или библиотек.
Файлы библиотеки или её части размещается в директори /assets/vendor/<название_библиотеки>
Затем, как и в случае с библиотеками, подключенными через Yarn, необходимо добавить путь в libs.js
В момент сборки все файлы будут сжаты в единый файл `vendor.min.js` или `vendor.min.css`


## Файл `options.js`
В файле `options.js` содержатся настройки сборки.
* **enableIntegration** - Включает режим интеграции. При включении не происходит сборка `templates`
* **proxyHost** - Хост для проксирования BrowserSync
* **openBrowser** - Открывает окно браузера при запуске browser-sync
* **notifications** - Выводит уведомления о выполнении определенных задач
* **srcDir** - Директория с исходными файлами проекта
* **destDir** - Директория, в которую происходит сборка проекта
* **jpeg** - Параметры работы плагина сжатия [jpegoptim](https://www.npmjs.com/package/imagemin-jpegoptim)
* **png** - Параметры работы плагина сжатия [pngquant](https://www.npmjs.com/package/imagemin-pngquant)

## Режим интеграции шаблона
Данный режим позволяет работать BrowserSync даже когда сайт работает на внешнем вебсервере.
Например, полезно при переносе вёрстки на CMS. 

Для включения необходимо задать `enableIntegration: true` и указать в качестве значения `proxyHost` домен,
на котором запущен локальный вебсайт. 

### Примечание!
* Настройка `enableIntegration` удаляет все файлы и директории из `destDir`, поэтому будьте внимательны, указывая путь в переменной `destDir`

## Обновление версии шаблона
Для поддержания шаблона сборки в актуальном состоянии необходимо выполнить несколько простых действий:

1. Обновить файл `gulpfile.js` путём замены
2. Обновить файл `package.json`. Для этого нужно заменить его новым и перенести старый блок `dependencies` в новый файл
3. Проверить соответствие структуры файла `libs.js` с актуальной версией
4. Проверить файл `options.js` на присутствие в нём всех необходимых настроек и значений
5. Обновить файлы `README.md` и `.gitignore`
