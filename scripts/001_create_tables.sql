-- DelistMe.com Database Schema

-- Users profile table with phone verification and consent
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  phone_number text,
  phone_verified boolean default false,
  authorization_granted boolean default false,
  authorization_granted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);

-- Data brokers master list
create table if not exists public.data_brokers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  removal_difficulty text check (removal_difficulty in ('easy', 'medium', 'hard')),
  estimated_removal_days int default 7,
  created_at timestamptz default now()
);

-- Allow all authenticated users to read data brokers
alter table public.data_brokers enable row level security;
create policy "data_brokers_select_all" on public.data_brokers for select to authenticated using (true);

-- User's removal requests tracking
create table if not exists public.removal_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  data_broker_id uuid not null references public.data_brokers(id) on delete cascade,
  status text default 'queued' check (status in ('queued', 'in_progress', 'removed', 'failed')),
  found_at timestamptz default now(),
  removal_started_at timestamptz,
  removal_completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.removal_requests enable row level security;

create policy "removal_requests_select_own" on public.removal_requests for select using (auth.uid() = user_id);
create policy "removal_requests_insert_own" on public.removal_requests for insert with check (auth.uid() = user_id);
create policy "removal_requests_update_own" on public.removal_requests for update using (auth.uid() = user_id);
create policy "removal_requests_delete_own" on public.removal_requests for delete using (auth.uid() = user_id);

-- Trigger to auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, phone_number)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'phone_number', null)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Seed data brokers
insert into public.data_brokers (name, website, removal_difficulty, estimated_removal_days) values
  ('Whitepages', 'whitepages.com', 'easy', 3),
  ('Spokeo', 'spokeo.com', 'medium', 7),
  ('BeenVerified', 'beenverified.com', 'medium', 10),
  ('Intelius', 'intelius.com', 'hard', 14),
  ('PeopleFinder', 'peoplefinder.com', 'easy', 5),
  ('TruePeopleSearch', 'truepeoplesearch.com', 'easy', 3),
  ('FastPeopleSearch', 'fastpeoplesearch.com', 'easy', 3),
  ('USSearch', 'ussearch.com', 'medium', 7),
  ('PeopleSmart', 'peoplesmart.com', 'medium', 10),
  ('Radaris', 'radaris.com', 'hard', 14),
  ('MyLife', 'mylife.com', 'hard', 21),
  ('InstantCheckmate', 'instantcheckmate.com', 'medium', 7),
  ('ThatsThem', 'thatsthem.com', 'easy', 5),
  ('PublicRecordsNow', 'publicrecordsnow.com', 'medium', 7),
  ('ZabaSearch', 'zabasearch.com', 'easy', 3)
on conflict do nothing;
