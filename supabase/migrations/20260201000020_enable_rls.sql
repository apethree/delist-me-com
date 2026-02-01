-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.virtual_phone_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.virtual_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sms_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voicemails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.received_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clerk_identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dnc_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_brokers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broker_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.removal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.identity_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user ID
-- Note: (auth.jwt() ->> 'sub') works with Supabase Auth. For Clerk, we typically use a JWT claim or lookup.
-- Assuming we sync Clerk ID to auth.users or use a custom claim. 
-- For now, we rely on the standard Supabase (auth.jwt() ->> 'sub') which works if we exchange tokens or sync users.

-- Policy: Users can see their own data
CREATE POLICY "Users can read own data" ON public.users FOR SELECT USING ((auth.jwt() ->> 'sub') = id);
CREATE POLICY "Users can update own data" ON public.users FOR UPDATE USING ((auth.jwt() ->> 'sub') = id);

-- For other tables relying on user_id
DO $$
DECLARE
  t text;
  column_exists boolean;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename NOT IN ('users', 'data_brokers', 'profiles') LOOP
    -- Check if user_id column exists
    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = t 
      AND column_name = 'user_id'
    ) INTO column_exists;
    
    -- Only create policies if user_id column exists
    IF column_exists THEN
      EXECUTE format('CREATE POLICY "Users can read own data" ON %I FOR SELECT USING ((auth.jwt() ->> ''sub'') = user_id)', t);
      EXECUTE format('CREATE POLICY "Users can insert own data" ON %I FOR INSERT WITH CHECK ((auth.jwt() ->> ''sub'') = user_id)', t);
      EXECUTE format('CREATE POLICY "Users can update own data" ON %I FOR UPDATE USING ((auth.jwt() ->> ''sub'') = user_id)', t);
      EXECUTE format('CREATE POLICY "Users can delete own data" ON %I FOR DELETE USING ((auth.jwt() ->> ''sub'') = user_id)', t);
    END IF;
  END LOOP;
END $$;


-- Data Brokers are readable by all authenticated users
CREATE POLICY "Authenticated users can read brokers" ON public.data_brokers FOR SELECT TO authenticated USING (true);

-- Service role access
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('CREATE POLICY "Service role full access" ON %I FOR ALL TO service_role USING (true) WITH CHECK (true)', t);
  END LOOP;
END $$;
