# DelistMe Backend Implementation Checklist

**Last Updated:** 2026-01-31
**Status:** 🟡 In Planning

---

## Phase 1: Database Schema & Migrations ⏳

### Database Setup

- [x] Initialize Supabase project
- [x] Configure database connection
- [x] Set up migration system
- [x] Enable pgcrypto extension for encryption
- [ ] Configure database backups

### Core Tables

- [x] Create `users` table (extends auth.users, add clerk_user_id, dnc_registered)
- [x] Create `user_profiles` table
- [x] Create `subscriptions` table
- [x] Create `virtual_phone_numbers` table (add is_primary, purchase_price, monthly_cost)
- [x] Create `virtual_emails` table
- [x] Create `sms_messages` table
- [x] Create `voicemails` table
- [x] Create `clerk_identities` table
- [x] Create `dnc_registrations` table
- [x] Create `received_emails` table
- [x] Create `data_brokers` table
- [x] Create `scan_sessions` table
- [x] Create `broker_findings` table
- [x] Create `removal_requests` table
- [x] Create `activity_log` table
- [x] Create `notifications` table
- [x] Create `identity_verifications` table
- [x] Create `documents` table

### Indexes & Performance

- [x] Add indexes on user_id columns
- [x] Add indexes on created_at for sorting
- [x] Add indexes on status fields
- [x] Add composite indexes for common queries
- [x] Create materialized views for analytics

### Row Level Security (RLS)

- [x] Enable RLS on all tables
- [x] Create policy: users can read own data
- [x] Create policy: users can update own data
- [x] Create policy: service role full access
- [x] Test RLS policies thoroughly

### Seed Data

- [x] Seed data_brokers table with 127+ brokers
  - [x] People search sites (Whitepages, Spokeo, etc.)
  - [x] Background check sites
  - [x] Public records aggregators
  - [x] Marketing data brokers
- [ ] Create test users for development
- [ ] Seed sample activity data

---

## Phase 2: Supabase Edge Functions 🔄

### Authentication Functions

- [ ] `send-otp` - Phone OTP sending
- [ ] `verify-otp` - OTP verification
- [ ] `refresh-session` - Token refresh
- [ ] Test auth flow end-to-end

### Profile Functions

- [ ] `get-profile` - Fetch user profile
- [ ] `update-profile` - Update user details
- [ ] `verify-identity` - Identity verification flow
- [ ] Add input validation
- [ ] Add error handling

### Scanning Functions

- [ ] `start-scan` - Initiate broker scan
- [ ] `get-scan-status` - Check scan progress
- [ ] `get-findings` - Retrieve scan results
- [ ] Implement scan orchestration logic
- [ ] Add retry mechanism for failed scans

### Removal Functions

- [ ] `submit-removal` - Create removal request
- [ ] `get-removals` - List user removals
- [ ] `get-removal-status` - Check removal progress
- [ ] `retry-removal` - Retry failed removal
- [ ] Implement removal workflows

### Virtual Phone Functions

- [ ] `create-virtual-number` - Provision number (1st free, additional at subscription cost)
- [ ] `list-virtual-numbers` - Get user's numbers
- [ ] `toggle-virtual-number` - Pause/resume
- [ ] `update-forwarding` - Update forwarding settings
- [ ] `delete-virtual-number` - Cancel number
- [ ] Integrate with Twilio API
- [ ] Handle Twilio SMS webhook
- [ ] Handle Twilio voice webhook
- [ ] Handle Twilio status callback
- [ ] Implement call forwarding logic

### Virtual Email Functions

- [ ] `create-virtual-email` - Create @delistme.com address
- [ ] `list-virtual-emails` - Get user's emails
- [ ] `toggle-virtual-email` - Pause/resume
- [ ] `update-email-forwarding` - Update forwarding settings
- [ ] `delete-virtual-email` - Cancel email
- [ ] Handle inbound email webhook
- [ ] Implement email parsing
- [ ] Implement email forwarding

### SMS & Voicemail Functions

- [ ] `list-sms` - Get SMS messages
- [ ] `get-sms` - Get SMS details
- [ ] `send-sms` - Send SMS from virtual number
- [ ] `mark-sms-read` - Mark SMS as read
- [ ] `list-voicemails` - Get voicemails
- [ ] `get-voicemail` - Get voicemail details
- [ ] `mark-voicemail-listened` - Mark as listened
- [ ] `delete-voicemail` - Delete voicemail
- [ ] Store voicemail recordings in Supabase Storage
- [ ] Implement voicemail transcription (optional AI)

### DNC Registry Functions

- [ ] `register-dnc` - Register phone on Do Not Call list
- [ ] `check-dnc-status` - Check registration status
- [ ] `list-dnc-registrations` - List all registrations
- [ ] Integrate with FTC DNC API
- [ ] Handle DNC expiration (5 years)

### Clerk Integration Functions

- [ ] `clerk-user-webhook` - Handle user events (create, update, delete)
- [ ] `clerk-session-webhook` - Handle session events
- [ ] `sync-clerk-identities` - Sync identities to Supabase
- [ ] `list-identities` - Get user's linked identities
- [ ] Implement Clerk webhook signature verification
- [ ] Handle multi-identity linking

### Subscription Functions

- [ ] `create-checkout` - Stripe checkout session
- [ ] `customer-portal` - Stripe portal link
- [ ] `get-subscription` - Current subscription
- [ ] `cancel-subscription` - Cancel flow
- [ ] Handle subscription webhooks

### Notification Functions

- [ ] `get-notifications` - Fetch user notifications
- [ ] `mark-read` - Mark notification read
- [ ] `register-push-token` - Register device
- [ ] Send push notifications via Expo
- [ ] Send email notifications

### Activity Functions

- [ ] `get-activity-feed` - Activity timeline
- [ ] `log-activity` - Create activity entry
- [ ] Pagination support
- [ ] Real-time subscriptions

---

## Phase 3: Background Jobs & Cron ⏰

### Daily Jobs

- [ ] **Scan Monitor** - Check for new broker listings
  - Schedule: Every 24 hours
  - Function: `cron-scan-monitor`
- [ ] **Removal Status Checker** - Verify completions
  - Schedule: Every 24 hours
  - Function: `cron-check-removals`
- [ ] **Subscription Checker** - Handle expiries
  - Schedule: Every 24 hours
  - Function: `cron-subscription-check`
- [ ] **Notification Digest** - Daily summaries
  - Schedule: Daily at 9am user local time
  - Function: `cron-daily-digest`

### Weekly Jobs

- [ ] **Re-scan** - Re-check removed profiles
  - Schedule: Every 7 days
  - Function: `cron-rescan`
- [ ] **Broker Database Update** - Update broker list
  - Schedule: Weekly on Sundays
  - Function: `cron-update-brokers`

### Monthly Jobs

- [ ] **Data Cleanup** - Archive old records
  - Schedule: 1st of month
  - Function: `cron-cleanup`
- [ ] **Analytics Report** - Monthly stats
  - Schedule: 1st of month
  - Function: `cron-monthly-report`

---

## Phase 4: External Integrations 🔌

### Stripe Integration

- [ ] Set up Stripe webhook endpoint
- [ ] Handle `customer.subscription.created`
- [ ] Handle `customer.subscription.updated`
- [ ] Handle `customer.subscription.deleted`
- [ ] Handle `invoice.payment_succeeded`
- [ ] Handle `invoice.payment_failed`
- [ ] Handle virtual number purchase payments
- [ ] Test webhook locally
- [ ] Deploy webhook to production

### Clerk Integration

- [ ] Set up Clerk webhook endpoint
- [ ] Verify webhook signatures
- [ ] Handle `user.created` event
- [ ] Handle `user.updated` event
- [ ] Handle `user.deleted` event
- [ ] Sync user data to Supabase
- [ ] Sync OAuth identities (Google, Apple)
- [ ] Handle multi-identity linking
- [ ] Test webhook locally
- [ ] Deploy webhook to production

### Twilio Integration

- [ ] Set up Twilio account
- [ ] Create phone number pool
- [ ] Implement number provisioning (1st free, additional paid)
- [ ] Handle incoming SMS webhook
- [ ] Handle incoming call webhook
- [ ] Handle voicemail recording webhook
- [ ] Set up call forwarding
- [ ] Store SMS messages in database
- [ ] Store voicemail recordings in Supabase Storage
- [ ] Implement SMS sending

### Virtual Email Service

- [ ] Choose email service provider (Mailgun, SendGrid Inbound Parse, etc.)
- [ ] Set up custom domain (@delistme.com)
- [ ] Configure MX records
- [ ] Set up inbound email webhook
- [ ] Implement email parsing
- [ ] Store received emails in database
- [ ] Implement email forwarding
- [ ] Handle email attachments
- [ ] Test email delivery

### DNC Registry Integration

- [ ] Research FTC Do Not Call Registry API
- [ ] Set up API credentials
- [ ] Implement phone number registration
- [ ] Implement status checking
- [ ] Handle registration confirmation
- [ ] Track expiration dates (5 years)
- [ ] Implement renewal reminders

### Expo Push Notifications

- [ ] Set up Expo push credentials
- [ ] Implement token registration
- [ ] Create notification sender
- [ ] Handle notification interactions
- [ ] Test on iOS
- [ ] Test on Android

### Email Service (Resend/SendGrid)

- [ ] Set up email service account
- [ ] Create email templates
- [ ] Implement email sender
- [ ] Add unsubscribe handling
- [ ] Test deliverability

### ID Verification (Optional)

- [ ] Evaluate providers (Persona, Stripe Identity)
- [ ] Integrate verification flow
- [ ] Handle verification webhooks
- [ ] Store verification status

---

## Phase 5: Real-time Features ⚡

### Supabase Realtime Setup

- [ ] Enable Realtime on database
- [ ] Configure Realtime policies
- [ ] Test connection stability

### Real-time Channels

- [ ] Scan progress updates
  - Channel: `scan-session:{id}`
  - Events: progress, status_change, complete
- [ ] Activity feed updates
  - Channel: `user-activity:{user_id}`
  - Events: new_activity
- [ ] Removal status updates
  - Channel: `removal:{id}`
  - Events: status_change
- [ ] Notification updates
  - Channel: `user-notifications:{user_id}`
  - Events: new_notification

### Mobile Client

- [ ] Implement Realtime client in React Native
- [ ] Handle connection/reconnection
- [ ] Update UI on real-time events
- [ ] Add optimistic updates

---

## Phase 6: Security & Compliance 🔒

### Encryption

- [ ] Implement PII field encryption
  - user_profiles: phone_number, ssn_last_4, dob
  - virtual_phone_numbers: forwarding_number
  - identity_verifications: verification_data
- [ ] Create encryption key management
- [ ] Test encryption/decryption
- [ ] Document encryption strategy

### Security Hardening

- [ ] Rate limiting on Edge Functions
- [ ] CORS configuration
- [ ] SQL injection prevention
- [ ] Input sanitization
- [ ] XSS prevention
- [ ] CSRF protection

### Compliance Features

- [ ] **GDPR Compliance**
  - [ ] Data export endpoint
  - [ ] Data deletion endpoint
  - [ ] Privacy policy integration
  - [ ] Cookie consent (web)
- [ ] **CCPA Compliance**
  - [ ] Do not sell toggle
  - [ ] Data deletion request
  - [ ] California resident verification

### Audit Logging

- [ ] Log all data access
- [ ] Log all data modifications
- [ ] Log authentication events
- [ ] Retention policy for logs

---

## Phase 7: Performance Optimization 🚀

### Database Optimization

- [ ] Query performance analysis
- [ ] Add missing indexes
- [ ] Optimize slow queries
- [ ] Set up connection pooling
- [ ] Configure query timeout

### API Optimization

- [ ] Implement response caching
- [ ] Add pagination to all list endpoints
- [ ] Optimize payload sizes
- [ ] Compress responses
- [ ] Add API versioning

### Mobile Optimization

- [ ] Implement offline-first architecture
- [ ] Add local SQLite cache
- [ ] Implement delta sync
- [ ] Optimize image loading
- [ ] Lazy load heavy data

---

## Phase 8: Monitoring & DevOps 📊

### Logging

- [ ] Set up structured logging
- [ ] Configure log levels
- [ ] Set up log aggregation
- [ ] Create log retention policy

### Monitoring

- [ ] Set up Supabase monitoring
- [ ] Monitor API response times
- [ ] Monitor error rates
- [ ] Monitor database performance
- [ ] Monitor Realtime connections

### Alerting

- [ ] Alert on high error rates
- [ ] Alert on failed cron jobs
- [ ] Alert on payment failures
- [ ] Alert on security events
- [ ] Set up on-call rotation

### Analytics

- [ ] Track key metrics
  - User signups
  - Scan completion rate
  - Removal success rate
  - Subscription conversions
  - Churn rate
- [ ] Create analytics dashboard
- [ ] Set up weekly reports

---

## Phase 9: Testing 🧪

### Unit Tests

- [ ] Database function tests
- [ ] Edge function tests
- [ ] Utility function tests
- [ ] Coverage > 80%

### Integration Tests

- [ ] Auth flow tests
- [ ] Scan workflow tests
- [ ] Removal workflow tests
- [ ] Subscription flow tests
- [ ] Webhook tests

### End-to-End Tests

- [ ] Mobile app E2E tests
- [ ] Critical user flows
- [ ] Payment flows
- [ ] Notification delivery

### Load Testing

- [ ] API endpoint load tests
- [ ] Database query load tests
- [ ] Concurrent user simulation
- [ ] Identify bottlenecks

---

## Phase 10: Documentation 📚

### API Documentation

- [ ] OpenAPI/Swagger spec
- [ ] Endpoint documentation
- [ ] Request/response examples
- [ ] Error codes reference

### Developer Documentation

- [ ] Architecture overview
- [ ] Database schema docs
- [ ] Deployment guide
- [ ] Local development setup
- [ ] Contributing guide

### User Documentation

- [ ] API usage examples
- [ ] Mobile SDK documentation
- [ ] Webhook integration guide
- [ ] Troubleshooting guide

---

## Phase 11: Deployment 🚀

### Staging Environment

- [ ] Set up staging Supabase project
- [ ] Deploy Edge Functions to staging
- [ ] Deploy mobile app to TestFlight/Internal Testing
- [ ] Run full E2E test suite
- [ ] Performance testing

### Production Environment

- [ ] Set up production Supabase project
- [ ] Configure production environment variables
- [ ] Deploy Edge Functions to production
- [ ] Set up database backups
- [ ] Configure monitoring and alerts
- [ ] Deploy mobile app to stores

### Post-Launch

- [ ] Monitor initial production traffic
- [ ] Gather user feedback
- [ ] Hot-fix critical issues
- [ ] Plan iteration 1 features

---

## Progress Summary

- **Phase 1 (Database):** 37/43 tasks 🟩🟩🟩🟩⬜️
- **Phase 2 (Edge Functions):** 0/74 tasks ⬜️⬜️⬜️⬜️⬜️
- **Phase 3 (Cron Jobs):** 0/8 tasks ⬜️⬜️⬜️⬜️⬜️
- **Phase 4 (Integrations):** 0/67 tasks ⬜️⬜️⬜️⬜️⬜️
- **Phase 5 (Real-time):** 0/11 tasks ⬜️⬜️⬜️⬜️⬜️
- **Phase 6 (Security):** 0/22 tasks ⬜️⬜️⬜️⬜️⬜️
- **Phase 7 (Performance):** 0/14 tasks ⬜️⬜️⬜️⬜️⬜️
- **Phase 8 (Monitoring):** 0/18 tasks ⬜️⬜️⬜️⬜️⬜️
- **Phase 9 (Testing):** 0/12 tasks ⬜️⬜️⬜️⬜️⬜️
- **Phase 10 (Documentation):** 0/12 tasks ⬜️⬜️⬜️⬜️⬜️
- **Phase 11 (Deployment):** 0/12 tasks ⬜️⬜️⬜️⬜️⬜️

**Total Progress:** 0/293 tasks (0%)

---

**Next Action:** Begin Phase 1 - Database Schema & Migrations
