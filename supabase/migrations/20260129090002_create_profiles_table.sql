create table public.profiles (
  id text not null primary key,
  email text,
  full_name text,
  avatar_url text,
  phone text,
  consent_scan boolean default false,
  consent_removal boolean default false,
  consent_monitor boolean default false,
  onboarding_complete boolean default false,
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using ((auth.jwt() ->> 'sub') = id);

create policy "Users can update own profile" on public.profiles
  for update using ((auth.jwt() ->> 'sub') = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check ((auth.jwt() ->> 'sub') = id);
