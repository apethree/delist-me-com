-- Add subscription tracking to profiles
alter table public.profiles 
add column if not exists stripe_customer_id text,
add column if not exists stripe_subscription_id text,
add column if not exists subscription_status text check (subscription_status in ('active', 'past_due', 'canceled', 'unpaid', 'incomplete', 'incomplete_expired', 'trialing')),
add column if not exists subscription_plan_id text,
add column if not exists current_period_end timestamptz;

-- Add index for customer lookups
create index if not exists profiles_stripe_customer_id_idx on public.profiles(stripe_customer_id);
