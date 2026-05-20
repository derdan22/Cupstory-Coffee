-- MacCoffee: розширення брендів (якщо таблиця вже існує)
alter table public.products drop constraint if exists products_brand_check;
alter table public.products add constraint products_brand_check
  check (brand in ('Jacobs', 'Lavazza', 'MacCoffee'));

insert into public.products (name, brand, category, description, price, weight, image_url, is_popular) values
  ('MacCoffee The Original 3в1', 'MacCoffee', 'Coffee Sticks', 'Класична миттєва кава 3 в 1.', 189, '20 стіків', '/images/maccoffee-original.png', true),
  ('MacCoffee Cappuccino 3в1', 'MacCoffee', 'Coffee Sticks', 'Капучино у стіках.', 199, '20 стіків', '/images/maccoffee-original.png', true),
  ('MacCoffee Classic 3в1', 'MacCoffee', 'Coffee Sticks', 'Упаковка 50 стіків.', 429, '50 стіків', '/images/maccoffee-original.png', false)
on conflict do nothing;
