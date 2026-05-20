# ☕ CupStory Coffee

Premium e-commerce для **Jacobs** и **Lavazza** — тёмный luxury UI в стиле Starbucks, glassmorphism, анимации.

> **Демо без установки:** после пуша на GitHub откройте **Live Demo** (ссылка ниже).

## 🔗 Деплой на Vercel (рекомендуется)

Сайт — статический Vite + React. На Vercel **не задавайте** `VITE_BASE_PATH` (корень домена `/`).

### Вариант A — через GitHub (проще всего)

1. Залейте проект на GitHub (репозиторий `cupstory-coffee`).
2. Откройте [vercel.com](https://vercel.com) → **Add New → Project**.
3. Импортируйте репозиторий. Vercel сам подставит:
   - **Framework Preset:** Vite  
   - **Build Command:** `npm run build`  
   - **Output Directory:** `dist`
4. **Deploy**. Через 1–2 минуты получите ссылку вида `https://cupstory-coffee.vercel.app`.

Файл `vercel.json` уже настроен: маршруты `/checkout` и SPA работают после перезагрузки страницы.

### Вариант B — с компьютера (CLI)

```bash
npm install -g vercel
cd cupstory-coffee
vercel login
vercel
vercel --prod
```

### Переменные окружения (опционально)

В Vercel: **Project → Settings → Environment Variables**

| Имя | Значение |
|-----|----------|
| `VITE_SUPABASE_URL` | URL проекта Supabase |
| `VITE_SUPABASE_ANON_KEY` | anon key |

Без них сайт работает на **demo-данных** из `src/lib/products.ts`.

После добавления переменных нажмите **Redeploy**.

---

## GitHub Pages (альтернатива)

**https://ВАШ-USERNAME.github.io/cupstory-coffee/**

1. Репозиторий на GitHub → **Settings → Pages → Source:** `GitHub Actions`.
2. Workflow `.github/workflows/deploy.yml` соберёт сайт с `VITE_BASE_PATH=/${repo}/`.

Демо работает **без Supabase**: каталог и корзина на встроенных demo-данных.

## Превью

| Hero | Каталог |
|------|---------|
| Тёмный premium фон, слоган *Every Cup Has Its Story* | Glass-карточки, фильтры Jacobs / Lavazza |

Скриншот для README: сделайте `Win + Shift + S` на http://localhost:5173 и положите файл в `docs/preview.png` — картинка появится здесь:

<!-- ![CupStory preview](./docs/preview.png) -->

## Стек

React 19 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · Zustand · Supabase · Sonner

## Локальный запуск

```bash
npm install
npm run dev
```

http://localhost:5173

## Сборка

```bash
npm run build
npm run preview
```

## Supabase (опционально)

1. Проект на [supabase.com](https://supabase.com)
2. SQL: `supabase/migrations/001_schema.sql`
3. `.env.local` из `.env.example`

Без `.env` — demo-товары и заказы в консоль браузера.

## Структура

```
src/
  components/   # UI, секции, корзина
  lib/          # Supabase, типы
  store/        # Корзина (Zustand)
supabase/       # SQL-схема
```

## Лицензия

MIT — свободно смотреть и показывать друзьям.
