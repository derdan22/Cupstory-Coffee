# ☕ CupStory Coffee

Premium e-commerce для **Jacobs** и **Lavazza** — тёмный luxury UI в стиле Starbucks, glassmorphism, анимации.

> **Демо без установки:** после пуша на GitHub откройте **Live Demo** (ссылка ниже).

## 🔗 Деплой на Vercel (рекомендуется)

Сайт — статический Vite + React. На Vercel **не задавайте** `VITE_BASE_PATH` (корень домена `/`).

### GitHub Pages (основной способ)

1. Залейте код в репозиторий на GitHub.
2. Дождитесь зелёной галочки workflow **Deploy to GitHub Pages** (вкладка Actions).
3. **Settings → Pages → Build and deployment:**
   - **Source:** Deploy from a branch  
   - **Branch:** `gh-pages`  
   - **Folder:** `/ (root)`
4. Сайт: `https://ВАШ-ЛОГИН.github.io/ИМЯ-РЕПО/`  
   Пример: `https://derdan22.github.io/Cupstory-Coffee/`

Важно: не выбирайте «GitHub Actions» как Source, если используете этот workflow — нужна ветка **gh-pages**.

### Vercel (альтернатива)

1. [vercel.com](https://vercel.com) → **Add New → Project** → импорт репозитория.
2. **Framework:** Vite, **Build:** `npm run build`, **Output:** `dist`.
3. **Не задавайте** `VITE_BASE_PATH` на Vercel.

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
