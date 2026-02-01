-- Enable extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Encryption function
CREATE OR REPLACE FUNCTION encrypt_pii(data text)
RETURNS bytea AS $$
BEGIN
  -- Uses app.encryption_key setting which must be set in postgresql.conf or session
  RETURN pgp_sym_encrypt(data, current_setting('app.encryption_key'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Decryption function
CREATE OR REPLACE FUNCTION decrypt_pii(data bytea)
RETURNS text AS $$
BEGIN
  RETURN pgp_sym_decrypt(data, current_setting('app.encryption_key'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
