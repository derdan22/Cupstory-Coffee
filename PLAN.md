# CupStory Coffee — План разработки

**Проект:** Premium e-commerce для Jacobs & Lavazza  
**Папка:** `Desktop/cupstory-coffee`  
**Стек:** Next.js 15 · React · Tailwind CSS · Framer Motion · Supabase

---

## Фаза 1 — Инициализация (текущая)

- [x] Создать папку проекта на рабочем столе
- [x] План разработки (этот файл)
- [ ] Next.js + TypeScript + Tailwind + App Router
- [ ] Зависимости: `framer-motion`, `@supabase/supabase-js`, `sonner` (toast)
- [ ] Базовая структура папок и дизайн-токены

## Фаза 2 — Supabase

- [ ] SQL: таблицы `products`, `orders`
- [ ] RLS: публичное чтение товаров, вставка заказов без auth
- [ ] Seed: демо-товары Jacobs / Lavazza
- [ ] `.env.local.example` с переменными Supabase

## Фаза 3 — UI / Дизайн-система

- [ ] Тёмная premium палитра (forest green, gold, coffee brown)
- [ ] Glassmorphism компоненты (`GlassCard`, `Button`, `Badge`)
- [ ] Типографика: display + body (Google Fonts)
- [ ] Floating coffee beans (Framer Motion)
- [ ] Loading skeletons

## Фаза 4 — Страницы и секции

| Секция | Описание |
|--------|----------|
| Header | Glass nav pill, logo, cart icon |
| Hero | Слоган, CTA, product renders, animated beans |
| Catalog | Фильтры по категориям, карточки из Supabase |
| Popular | Топ-товары |
| Why Us | Преимущества |
| Brands | Jacobs / Lavazza split sections |
| Delivery | Условия доставки |
| Contact | Форма + контакты |
| Footer | Subscribe, соцсети |

## Фаза 5 — Корзина и заказ

- [ ] Zustand / Context: cart state (localStorage persist)
- [ ] Slide drawer справа + floating cart button
- [ ] Checkout modal: имя, фамилия, телефон, комментарий
- [ ] INSERT в `orders`, status = `Новый`
- [ ] Success modal + toast

## Фаза 6 — Полировка

- [ ] Mobile-first responsive
- [ ] `whileInView` анимации секций
- [ ] Empty cart state
- [ ] README с инструкцией по Supabase

---

## Структура проекта

```
cupstory-coffee/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/       # Header, Footer
│   ├── sections/     # Hero, Catalog, Brands...
│   ├── cart/         # Drawer, FloatingButton
│   ├── ui/           # GlassCard, Button, Skeleton...
│   └── providers/    # CartProvider, Toaster
├── lib/
│   ├── supabase.ts
│   └── types.ts
├── store/
│   └── cart-store.ts
├── supabase/
│   └── migrations/001_schema.sql
└── public/
    └── images/
```

## SQL Schema (кратко)

**products:** id, name, brand, category, description, price, weight, image_url, is_popular, created_at  

**orders:** id, first_name, last_name, phone, comment, items (jsonb), total_price, status, created_at  

**status enum:** `Новый` | `Обрабатывается` | `Завершен`

---

## Следующий шаг

Скаффолд Next.js и базовые компоненты → подключение Supabase → Hero + Catalog.
