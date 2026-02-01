-- User lookups
CREATE INDEX IF NOT EXISTS idx_users_clerk_user_id ON public.users(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON public.users(stripe_customer_id);

-- Virtual phone lookups
CREATE INDEX IF NOT EXISTS idx_virtual_phones_user_id ON public.virtual_phone_numbers(user_id);
CREATE INDEX IF NOT EXISTS idx_virtual_phones_phone_number ON public.virtual_phone_numbers(phone_number);
CREATE INDEX IF NOT EXISTS idx_virtual_phones_provider_sid ON public.virtual_phone_numbers(provider_sid);

-- Virtual email lookups
CREATE INDEX IF NOT EXISTS idx_virtual_emails_user_id ON public.virtual_emails(user_id);
CREATE INDEX IF NOT EXISTS idx_virtual_emails_email_address ON public.virtual_emails(email_address);

-- SMS message lookups
CREATE INDEX IF NOT EXISTS idx_sms_user_id ON public.sms_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_sms_virtual_phone_id ON public.sms_messages(virtual_phone_id);
CREATE INDEX IF NOT EXISTS idx_sms_created_at ON public.sms_messages(created_at DESC);

-- Voicemail lookups
CREATE INDEX IF NOT EXISTS idx_voicemails_user_id ON public.voicemails(user_id);
CREATE INDEX IF NOT EXISTS idx_voicemails_virtual_phone_id ON public.voicemails(virtual_phone_id);
CREATE INDEX IF NOT EXISTS idx_voicemails_created_at ON public.voicemails(created_at DESC);

-- Received email lookups
CREATE INDEX IF NOT EXISTS idx_received_emails_user_id ON public.received_emails(user_id);
CREATE INDEX IF NOT EXISTS idx_received_emails_virtual_email_id ON public.received_emails(virtual_email_id);
CREATE INDEX IF NOT EXISTS idx_received_emails_created_at ON public.received_emails(created_at DESC);

-- Clerk identity lookups
CREATE INDEX IF NOT EXISTS idx_clerk_identities_user_id ON public.clerk_identities(user_id);
CREATE INDEX IF NOT EXISTS idx_clerk_identities_clerk_identity_id ON public.clerk_identities(clerk_identity_id);

-- DNC registration lookups
CREATE INDEX IF NOT EXISTS idx_dnc_user_id ON public.dnc_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_dnc_phone_number ON public.dnc_registrations(phone_number);

-- Activity log
CREATE INDEX IF NOT EXISTS idx_activity_user_id ON public.activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_created_at ON public.activity_log(created_at DESC);

-- Scan sessions
CREATE INDEX IF NOT EXISTS idx_scan_sessions_user_id ON public.scan_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_scan_sessions_status ON public.scan_sessions(status);

-- Broker findings
CREATE INDEX IF NOT EXISTS idx_findings_user_id ON public.broker_findings(user_id);
CREATE INDEX IF NOT EXISTS idx_findings_scan_session_id ON public.broker_findings(scan_session_id);
CREATE INDEX IF NOT EXISTS idx_findings_broker_id ON public.broker_findings(broker_id);

-- Removal requests
CREATE INDEX IF NOT EXISTS idx_removals_user_id ON public.removal_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_removals_status ON public.removal_requests(status);
