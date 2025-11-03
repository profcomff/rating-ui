# Rating UI -- интерфейс сервиса оценки преподавателей "Дубинушка"

Фронтенд для приложения по оценке преподавателей на Vue.js с TypeScript и Vite.

Большая часть команд и инструкций написаны для Linux и MacOS, но должны работать и на Windows.

---

## Зависимости

- **Node.js** >= v18 – среда выполнения JavaScript/TypeScript
- **PNPM** – менеджер пакетов (можно использовать NPM, но мы рекомендуем PNPM)
- **Vue.js** – фреймворк для фронтенда
- **Vite** – инструмент сборки и локального сервера
- **Docker** – для сборки и деплоя

---

## Разработка

1. Склонируй проект:
    1. `cd /path/to/folder`
    2. `git clone https://github.com/profcomff/rental-ui.git project-folder-name`

2. Установи зависимости: `pnpm install`

3. Запусти локальный dev-сервер: `pnpm dev`

Приложение будет доступно на http://localhost:5173.

### Форматирование

1. Открыть файл с расширением `.vue`.
2. Открыть палитру команд (Help > Show All Commands или `Ctrl+Shift+P`)
3. Ввести и выбрать `Format document with`.
4. Выбрать `Configure Default Formatter`.
5. Выбрать `Prettier`.

Теперь можно форматировать файлы с помощью `Shift+Alt+F`. Еще можно настроить автоформатирование при сохранении файла (`File > Preferences > Settings`, Format on save).

### Локальная авторизация

Для разработки с определенными скоупами можно проделать следующие шаги:

1. Переходим в [тестовое приложение](https://app.test.profcomff.com/admin) и копируем токен.
2. Вставляем токен в .env.development
3. В `/src/store/profileStore.ts` в функции `setupDevAdminSession` проверяем, есть ли все нужные нам скоупы.
4. В `src/App.vue` в хуке `onMounted`:

    ```typescript
    if (import.meta.env.MODE === 'development') await profileStore.setupDevAdminSession(null);
    ```

> ⚠️ Важно: токен в .env.development не коммитим — он только для локального девелопмента.

Метод создает сессию через API с заданными скоупами. Для создания сессий с другим набором скоупов можно писать аналогичные методы.

### Интеграция с "Твой ФФ"

Когда приложение подключено к Твой ФФ, оно ожидает увидеть токен, скоупы и всю дополнительную информацию в параметрах URL. Для этого в `src/store/profileStore.ts` есть метод `fromUrl` -- его стоит вызывать всегда кроме режима разработки.

### Пулл реквесты

Перед пулл-реквестом:

1. Проверь стили: `pnpm check`
2. _Опционально_: подробная версия `pnpm check:hard`
3. Заполни шаблон пулл-реквеста: что, как и зачем сделано.
4. Запроси ревью у команды.

## Сборка и деплой

### Сборка и запуск через Docker:

```bash
make # создаёт Docker образ
make run # запускает приложение
```

Dockerfile и docker-compose уже настроены для простого деплоя. В .env указываем базовый URL API:

```env
VITE_API_BASE_URL=https://api.example.com
```

### CI/CD

GitHub Actions автоматически проверяет код на PR: eslint, prettier, stylelint

Автосборка: коммит в main создаёт Docker-образ через workflow .github/workflows/build_and_publish.yml

### Ссылки

API документация -- [Swagger](https://api.test.profcomff.com/?urls.primaryName=rental)