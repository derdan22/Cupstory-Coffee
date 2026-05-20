-- CupStory Coffee — Supabase schema
-- Run in Supabase SQL Editor

create extension if not exists "uuid-ossp";

-- Products
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  brand text not null check (brand in ('Jacobs', 'Lavazza', 'MacCoffee')),
  category text not null,
  description text not null default '',
  price numeric(10, 2) not null check (price >= 0),
  weight text not null default '',
  image_url text not null default '',
  is_popular boolean not null default false,
  created_at timestamptz not null default now()
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  last_name text not null,
  phone text not null,
  comment text,
  items jsonb not null default '[]'::jsonb,
  total_price numeric(10, 2) not null check (total_price >= 0),
  status text not null default 'Новый'
    check (status in ('Новый', 'Обрабатывается', 'Завершен')),
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.orders enable row level security;

-- Public read products
create policy "products_select_anon"
  on public.products for select
  to anon, authenticated
  using (true);

-- Public insert orders (no auth shop)
create policy "orders_insert_anon"
  on public.orders for insert
  to anon, authenticated
  with check (true);

-- Seed products (optional)
insert into public.products (name, brand, category, description, price, weight, image_url, is_popular) values
  ('Jacobs Monarch', 'Jacobs', 'Ground Coffee', 'Классический молотый кофе средней обжарки.', 449, '250g', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80', true),
  ('Jacobs Barista Editions', 'Jacobs', 'Coffee Beans', 'Зерновой кофе премиум-класса.', 699, '1kg', 'https://images.unsplash.com/photo-1447933608593-bd566baafbe8?w=600&q=80', true),
  ('Lavazza Qualità Oro', 'Lavazza', 'Ground Coffee', 'Итальянская классика с нотами цитруса.', 529, '250g', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80', true),
  ('Lavazza Espresso Italiano', 'Lavazza', 'Capsules', 'Капсулы для espresso.', 389, '10 caps', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', false),
  ('Lavazza Crema e Gusto', 'Lavazza', 'Coffee Beans', 'Сбалансированная смесь арабики и робусты.', 799, '1kg', 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80', true),
  ('Jacobs Gold Collection', 'Jacobs', 'Premium Collection', 'Эксклюзивная линейка премиум зёрен.', 1299, '500g', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', true)
on conflict do nothing;
