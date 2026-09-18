# NetCoffee Shop

Интернет-магазин кофе, чая и десертов. Клиенты просматривают каталог после входа, администратор управляет товарами.

Монорепозиторий: React-клиент и Express-сервер, общая база MySQL.

## Стек

| Слой | Технологии |
| --- | --- |
| Frontend | React 19, React Router 7, Axios, Create React App |
| Backend | Node.js, Express, JWT, bcrypt, Multer |
| База данных | MySQL (`NCS`) |
| Инструменты | npm workspaces, nodemon |

## Возможности

- Регистрация и вход (JWT, срок жизни токена — 1 час)
- Роли `user` и `admin`
- Каталог товаров с карточками (кофе, чай, десерты)
- Защищённые маршруты: витрина — для авторизованных, админка — только для `admin`
- Загрузка изображений товаров (`PNG`)
- Статика с картинками: `http://localhost:3000/static/...`

## Структура

```
.
├── backend/                 API и статика
│   ├── dump_structure.sql   схема БД
│   ├── server.js            точка входа (порт 3000)
│   ├── public/images/       загруженные изображения
│   └── src/
│       ├── config/          MySQL, Multer
│       ├── controllers/
│       ├── middlewares/     JWT и проверка роли admin
│       ├── repositories/
│       └── routes/
└── frontend/                React-приложение (порт 4000)
    └── src/
        ├── api/
        ├── context/         AuthContext
        ├── presentation/    страницы и UI
        └── routes/
```

## Требования

- Node.js и npm
- MySQL 8+
- npm-пакеты ставятся из корня репозитория (workspaces: `frontend`, `backend`)

## Быстрый старт

### 1. База данных

Создайте базу и примените схему:

```sql
CREATE DATABASE NCS CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
```

```bash
mysql -u <user> -p NCS < backend/dump_structure.sql
```

Дамп содержит только структуру таблиц: `Users`, `Products`, `Types`, `Files`, `Images`, `Baskets`, `Baskets_product`.

### 2. Переменные окружения

В корне `backend/` создайте файл `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=NCS
JWT_SECRET=change_me
```

`.env` не коммитится (см. `.gitignore`).

### 3. Зависимости

Из корня репозитория:

```bash
npm install
```

Либо отдельно:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 4. Запуск

Два процесса, в разных терминалах.

**Backend** — `http://localhost:3000`

```bash
cd backend
npm run dev
```

**Frontend** — `http://localhost:4000`

```bash
cd frontend
npm start
```

Запросы с фронтенда на `/api` проксируются на backend (`frontend/src/setupProxy.js`).

## Страницы

| Путь | Доступ | Описание |
| --- | --- | --- |
| `/login` | публичный | Вход |
| `/register` | публичный | Регистрация (роль по умолчанию — `user`) |
| `/` | `user`, `admin` | Витрина |
| `/admin` | `admin` | Панель администратора |
| `/forbidden` | публичный | Нет прав |

Нового пользователя нужно вручную повысить до `admin` в таблице `Users`, если нужен доступ в админку.

## API

Базовый префикс: `http://localhost:3000/api`

### Auth

| Метод | Путь | Auth | Описание |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | — | Регистрация `{ username, password }` |
| `POST` | `/auth/login` | — | Вход, ответ `{ token, user }` |
| `GET` | `/auth/me` | JWT | Текущий пользователь |

### Products

| Метод | Путь | Auth | Описание |
| --- | --- | --- | --- |
| `GET` | `/product/get-all` | JWT | Список товаров |
| `POST` | `/product/get-one` | JWT | Один товар по `{ id }` |
| `POST` | `/product/add` | JWT + admin | Добавить товар |

Поля товара: `name`, `type`, `description`, `price`, `preview`.

Типы (`Types` / `frontend/src/data/types.js`): `1` — кофе, `2` — чай, `3` — десерт.

### Files

| Метод | Путь | Auth | Описание |
| --- | --- | --- | --- |
| `POST` | `/file/send` | — | Загрузка файла (`multipart`, поле `file`) |

Заголовок авторизации: `Authorization: Bearer <token>`.
