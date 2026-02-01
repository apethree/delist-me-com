# DelistMe Backend Roadmap

**Project:** DelistMe - Privacy Protection SaaS
**Primary Platform:** React Native Mobile (iOS/Android/Web)
**Backend:** Supabase (PostgreSQL + Auth + Storage + Functions)
**Last Updated:** 2026-01-31 (Updated with Virtual Email, SMS, DNC Registry)

---

## Project Overview

DelistMe helps users remove their personal information from data brokers through:

1. **Identity verification** - Multiple phones, emails, OAuth accounts (Google via Clerk)
2. **Data broker scanning** - 127+ brokers with automated detection
3. **Automated removal requests** - Submit and track removal requests
4. **Virtual phone numbers** - Twilio-powered privacy numbers (1st free, additional at subscription cost)
5. **Virtual email addresses** - Unique @delistme.com addresses per user
6. **Do Not Call (DNC) registry** - Automated registration tracking
7. **SMS/Voicemail inbox** - Store and view messages from virtual numbers
8. **Multi-identity management** - Link multiple emails, phones, OAuth accounts via Clerk
9. **Ongoing monitoring** - Real-time alerts and re-scanning

---

## Architecture Decisions

### Core Stack

- **Database:** PostgreSQL (via Supabase)
- **Auth:** Clerk (primary) + Supabase Auth (backend sync)
  - OAuth: Google, Apple
  - Multi-identity: Link multiple emails, phones, OAuth accounts
  - Webhook sync to Supabase for user profiles
- **Storage:** Supabase Storage (documents, identity verification, voicemails)
- **Functions:** Supabase Edge Functions (TypeScript/Deno)
- **Payments:** Stripe (subscriptions, virtual number purchases, webhooks)
- **Communications:**
  - Virtual Phone: Twilio (SMS, voice, call forwarding)
  - Virtual Email: Custom @delistme.com (email forwarding/storage)
  - Push: Expo Push Notifications
  - Email: Resend/SendGrid
- **Queue/Jobs:** Supabase Realtime + Edge Functions with Cron
- **AI/Scraping:** External services + custom scrapers
- **DNC Registry:** FTC Do Not Call API integration

### Design Principles

1. **Mobile-First:** All APIs optimized for mobile bandwidth/latency
2. **Offline-Capable:** Local-first with sync
3. **Real-time Updates:** Supabase Realtime for status changes
4. **Security:** RLS policies, encrypted PII
5. **Scalability:** Edge functions for compute, CDN for assets

---

## Database Schema (PostgreSQL)

### Core Tables

#### 1. **users** (extends Supabase auth.users)

```sql
- id (uuid, PK, FK to auth.users)
- clerk_user_id (text, unique) -- Clerk user ID for sync
- email (text)
- full_name (text)
- phone_number (text, encrypted)
- subscription_tier (int, 0-3)
- stripe_customer_id (text)
- onboarding_completed (boolean)
- dnc_registered (boolean) -- Do Not Call registry status
- dnc_registered_at (timestamptz)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 2. **user_profiles**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- date_of_birth (date, encrypted)
- ssn_last_4 (text, encrypted)
- addresses (jsonb[]) -- array of address objects
- previous_addresses (jsonb[])
- phone_numbers (jsonb[]) -- array of phone objects
- email_addresses (jsonb[])
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 3. **subscriptions**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users, unique)
- tier (int, 0-3)
- status (enum: active, cancelled, past_due, unpaid)
- stripe_subscription_id (text)
- stripe_price_id (text)
- current_period_start (timestamptz)
- current_period_end (timestamptz)
- cancel_at_period_end (boolean)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 4. **virtual_phone_numbers**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- phone_number (text)
- provider (text) -- twilio, etc
- provider_sid (text)
- status (enum: active, paused, cancelled)
- is_primary (boolean) -- first number is free
- purchase_price (decimal) -- 0 for first, subscription cost for additional
- monthly_cost (decimal)
- forwarding_enabled (boolean)
- forwarding_number (text, encrypted)
- created_at (timestamptz)
- updated_at (timestamptz)
- cancelled_at (timestamptz)
```

#### 5. **data_brokers**

```sql
- id (uuid, PK)
- name (text)
- domain (text)
- category (text) -- people search, background check, etc
- difficulty (enum: easy, medium, hard)
- removal_method (text) -- email, form, phone, mail
- removal_url (text)
- avg_removal_time_days (int)
- requires_verification (boolean)
- active (boolean)
- scrape_enabled (boolean)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 6. **scan_sessions**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- status (enum: pending, scanning, complete, failed)
- brokers_to_scan (int)
- brokers_scanned (int)
- brokers_found (int)
- started_at (timestamptz)
- completed_at (timestamptz)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 7. **broker_findings**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- scan_session_id (uuid, FK to scan_sessions)
- broker_id (uuid, FK to data_brokers)
- status (enum: found, not_found, error)
- profile_url (text)
- data_found (jsonb) -- what info was exposed
- screenshot_url (text)
- confidence_score (float)
- last_checked_at (timestamptz)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 8. **removal_requests**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- finding_id (uuid, FK to broker_findings)
- broker_id (uuid, FK to data_brokers)
- status (enum: pending, submitted, in_progress, completed, failed, denied)
- method (text) -- email, form, phone, etc
- confirmation_number (text)
- submitted_at (timestamptz)
- completed_at (timestamptz)
- retry_count (int)
- error_message (text)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 9. **activity_log**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- activity_type (text) -- scan_complete, request_sent, removal_complete, etc
- entity_type (text) -- broker, scan, request
- entity_id (uuid)
- title (text)
- description (text)
- metadata (jsonb)
- created_at (timestamptz)
```

#### 10. **notifications**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- type (text) -- push, email, sms
- channel (text) -- expo, sendgrid, twilio
- title (text)
- body (text)
- data (jsonb)
- status (enum: pending, sent, failed, read)
- sent_at (timestamptz)
- read_at (timestamptz)
- created_at (timestamptz)
```

#### 11. **identity_verifications**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- method (text) -- phone_otp, google, apple
- provider (text)
- verified (boolean)
- verification_data (jsonb, encrypted)
- verified_at (timestamptz)
- expires_at (timestamptz)
- created_at (timestamptz)
```

#### 12. **documents**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- type (text) -- id_document, proof_of_address, etc
- file_path (text) -- Supabase storage path
- file_name (text)
- file_size (int)
- mime_type (text)
- status (enum: pending, verified, rejected)
- created_at (timestamptz)
```

#### 13. **virtual_emails**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- email_address (text) -- format: {username}@delistme.com
- status (enum: active, paused, cancelled)
- forwarding_enabled (boolean)
- forwarding_email (text, encrypted) -- user's real email
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 14. **sms_messages**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- virtual_phone_id (uuid, FK to virtual_phone_numbers)
- direction (enum: inbound, outbound)
- from_number (text)
- to_number (text)
- body (text)
- media_urls (text[]) -- MMS attachments
- provider_message_sid (text) -- Twilio SID
- status (enum: received, sent, failed, delivered)
- read (boolean)
- created_at (timestamptz)
```

#### 15. **voicemails**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- virtual_phone_id (uuid, FK to virtual_phone_numbers)
- from_number (text)
- duration_seconds (int)
- recording_url (text) -- Twilio recording URL
- storage_path (text) -- Supabase storage path
- transcription (text) -- AI transcription
- provider_call_sid (text) -- Twilio call SID
- status (enum: new, listened, archived)
- created_at (timestamptz)
- listened_at (timestamptz)
```

#### 16. **clerk_identities**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- clerk_identity_id (text) -- Clerk identity ID
- provider (text) -- google, apple, email, phone
- provider_user_id (text) -- OAuth provider user ID
- email (text)
- phone_number (text)
- verified (boolean)
- is_primary (boolean)
- metadata (jsonb) -- additional OAuth data
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 17. **dnc_registrations**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- phone_number (text, encrypted)
- registration_status (enum: pending, registered, failed, expired)
- confirmation_number (text)
- registered_at (timestamptz)
- expires_at (timestamptz) -- DNC registrations expire after 5 years
- error_message (text)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### 18. **received_emails**

```sql
- id (uuid, PK)
- user_id (uuid, FK to users)
- virtual_email_id (uuid, FK to virtual_emails)
- from_email (text)
- to_email (text)
- subject (text)
- body_text (text)
- body_html (text)
- attachments (jsonb[]) -- array of attachment metadata
- headers (jsonb)
- read (boolean)
- created_at (timestamptz)
- read_at (timestamptz)
```

---

## API Endpoints (Supabase Edge Functions)

### Authentication

- `POST /auth/send-otp` - Send OTP to phone
- `POST /auth/verify-otp` - Verify OTP code
- `POST /auth/refresh` - Refresh session

### User Profile

- `GET /profile` - Get user profile
- `PUT /profile` - Update profile
- `POST /profile/verify-identity` - Start identity verification

### Scanning

- `POST /scans/start` - Start new scan
- `GET /scans/:id` - Get scan status
- `GET /scans/:id/findings` - Get findings from scan

### Removal Requests

- `POST /removals/request` - Submit removal request
- `GET /removals` - List user's removal requests
- `GET /removals/:id` - Get removal status
- `PUT /removals/:id/retry` - Retry failed removal

### Virtual Phone

- `POST /virtual-phone/create` - Create virtual number (1st free, additional at subscription cost)
- `GET /virtual-phone` - List user's virtual numbers
- `PUT /virtual-phone/:id/toggle` - Pause/activate
- `PUT /virtual-phone/:id/forwarding` - Update forwarding settings
- `DELETE /virtual-phone/:id` - Cancel number
- `POST /virtual-phone/webhooks/sms` - Twilio SMS webhook
- `POST /virtual-phone/webhooks/voice` - Twilio voice webhook
- `POST /virtual-phone/webhooks/status` - Twilio status callback

### Virtual Email

- `POST /virtual-email/create` - Create virtual email address
- `GET /virtual-email` - List user's virtual emails
- `PUT /virtual-email/:id/toggle` - Pause/activate
- `PUT /virtual-email/:id/forwarding` - Update forwarding settings
- `DELETE /virtual-email/:id` - Cancel email
- `POST /virtual-email/webhooks/inbound` - Inbound email webhook

### SMS & Voicemail

- `GET /sms` - List SMS messages
- `GET /sms/:id` - Get SMS details
- `POST /sms/send` - Send SMS from virtual number
- `PUT /sms/:id/read` - Mark SMS as read
- `GET /voicemail` - List voicemails
- `GET /voicemail/:id` - Get voicemail details
- `PUT /voicemail/:id/listen` - Mark voicemail as listened
- `DELETE /voicemail/:id` - Delete voicemail

### DNC Registry

- `POST /dnc/register` - Register phone on Do Not Call list
- `GET /dnc/status` - Check DNC registration status
- `GET /dnc/registrations` - List all DNC registrations

### Clerk Integration

- `POST /clerk/webhooks/user` - Clerk user webhook (create, update, delete)
- `POST /clerk/webhooks/session` - Clerk session webhook
- `POST /clerk/sync-identities` - Sync Clerk identities to Supabase
- `GET /identities` - List user's linked identities

### Subscriptions

- `POST /subscriptions/checkout` - Create Stripe checkout
- `POST /subscriptions/portal` - Customer portal link
- `GET /subscriptions/current` - Get current subscription

### Notifications

- `GET /notifications` - List notifications
- `PUT /notifications/:id/read` - Mark as read
- `POST /notifications/register-token` - Register push token

### Activity

- `GET /activity` - Get activity feed

---

## Background Jobs (Cron + Edge Functions)

### Daily Jobs

1. **Scan Monitor** - Check for new data broker listings
2. **Removal Status Checker** - Verify removal completion
3. **Subscription Checker** - Handle expired subscriptions
4. **Notification Digest** - Send daily summaries

### Weekly Jobs

1. **Re-scan** - Re-check removed profiles
2. **Broker Database Update** - Update broker list
3. **Analytics Report** - Generate weekly stats

### Monthly Jobs

1. **Data Cleanup** - Archive old records
2. **Compliance Report** - GDPR/CCPA reporting

---

## Real-time Features

### Supabase Realtime Subscriptions

1. **Scan Progress** - Live scan updates
2. **Activity Feed** - Real-time activity log
3. **Removal Status** - Status change notifications

---

## Security & Privacy

### Encryption

- PII fields encrypted at rest (user profiles, documents)
- Transparent encryption via pgcrypto extension

### Row Level Security (RLS)

- All tables have RLS policies
- Users can only access their own data
- Service role bypasses RLS for admin operations

### Compliance

- GDPR: Right to access, delete, export
- CCPA: Do not sell, delete data
- Data retention policies

---

## Integrations

### External Services

1. **Clerk** - Authentication & user management
   - OAuth providers (Google, Apple)
   - Multi-identity management
   - Webhooks for user sync to Supabase
2. **Stripe** - Payment processing
   - Subscriptions
   - Virtual number purchases
   - Webhooks for payment events
3. **Twilio** - Virtual phone numbers
   - SMS sending/receiving
   - Voice calls & call forwarding
   - Voicemail recording
   - Webhooks for inbound messages
4. **Virtual Email Service** - Custom @delistme.com addresses
   - Inbound email parsing
   - Email forwarding
   - SMTP relay (e.g., Mailgun, SendGrid Inbound Parse)
5. **Expo Push** - Mobile notifications
6. **Resend/SendGrid** - Transactional email delivery
7. **Scraping Service** - Data broker scraping
8. **ID Verification** - Persona/Stripe Identity (optional)
9. **FTC Do Not Call Registry API** - DNC registration
   - Phone number registration
   - Status verification

---

## Performance Optimization

### Database

- Indexes on frequently queried fields
- Materialized views for analytics
- Partitioning for large tables (activity_log)

### API

- Response caching (short TTL)
- Pagination for list endpoints
- GraphQL for flexible queries

### Mobile

- Offline-first with local SQLite cache
- Delta sync for efficient updates
- Image optimization and CDN

---

## Monitoring & Observability

### Metrics

- API response times
- Error rates
- Scan success rates
- Removal completion rates

### Alerts

- Failed scan sessions
- Payment failures
- High error rates
- Security events

---

## Next Steps

See `BACKEND_CHECKLIST.md` for implementation tracking.
