-- Create users table with RLS policies
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  name text not null,
  phone text not null,
  role text not null check (role in ('customer', 'staff', 'kitchen', 'admin')),
  restaurant_name text,
  address text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  last_sign_in_at timestamptz,
  is_active boolean default true
);

-- Enable Row Level Security
alter table public.users enable row level security;

-- Create policies
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id);

-- Create function to handle user updates
create or replace function public.handle_user_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Create trigger for user updates
create trigger on_user_update
  before update on public.users
  for each row
  execute function public.handle_user_update();

-- Create function to handle new user registration
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$;

-- Create trigger for new user registration
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Create function to update last sign in
create or replace function public.handle_user_sign_in()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.users
  set last_sign_in_at = now()
  where id = new.id;
  return new;
end;
$$;

-- Create trigger for user sign in
create trigger on_auth_user_sign_in
  after update of last_sign_in_at on auth.users
  for each row
  execute function public.handle_user_sign_in();
