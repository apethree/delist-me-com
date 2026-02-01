BEGIN;
SELECT plan(12);

-- 1. Check Tables Exist
SELECT has_table('users');
SELECT has_table('user_profiles');
SELECT has_table('breach_monitors');
SELECT has_table('known_breaches');
SELECT has_table('user_breaches');
SELECT has_table('identity_verifications');
SELECT has_table('documents');

-- 2. Check RLS Enabled
SELECT results_eq(
    $$ SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'public' AND rowsecurity = false $$,
    $$ VALUES (0::bigint) $$,
    'All public tables should have RLS enabled'
);

-- 3. Check Users Table PK is TEXT (Clerk ID support)
SELECT col_type_is('users', 'id', 'text', 'users.id should be text');



-- 4. Setup Users for RLS Testing
SET ROLE postgres; -- Ensure we have permission to create users
SELECT set_config('request.jwt.claims', '{"sub": "user_a_clerk_id"}', true);
INSERT INTO users (id, email, full_name) VALUES ('user_a_clerk_id', 'a@test.com', 'User A');

SELECT set_config('request.jwt.claims', '{"sub": "user_b_clerk_id"}', true);
INSERT INTO users (id, email, full_name) VALUES ('user_b_clerk_id', 'b@test.com', 'User B');

-- 5. RLS Isolation Test
SET ROLE authenticated; -- Enforce RLS
-- Switch to User A
SELECT set_config('request.jwt.claims', '{"sub": "user_a_clerk_id"}', true);

-- User A inserts a monitor
INSERT INTO breach_monitors (user_id, email) VALUES ('user_a_clerk_id', 'a@test.com');

-- Check User A can see it
SELECT results_eq(
    $$ SELECT count(*) FROM breach_monitors $$,
    $$ VALUES (1::bigint) $$,
    'User A should see their own monitor'
);

-- Switch to User B
SELECT set_config('request.jwt.claims', '{"sub": "user_b_clerk_id"}', true);

-- Check User B sees nothing
SELECT results_eq(
    $$ SELECT count(*) FROM breach_monitors $$,
    $$ VALUES (0::bigint) $$,
    'User B should NOT see User A monitor'
);

-- User B inserts their own
INSERT INTO breach_monitors (user_id, email) VALUES ('user_b_clerk_id', 'b@test.com');

-- Check User B sees 1
SELECT results_eq(
    $$ SELECT count(*) FROM breach_monitors $$,
    $$ VALUES (1::bigint) $$,
    'User B should see their own monitor'
);

SELECT * FROM finish();
ROLLBACK;
