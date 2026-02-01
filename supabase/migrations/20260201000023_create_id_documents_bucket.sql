-- Create storage bucket for ID documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('id-documents', 'id-documents', false);

-- Enable RLS on objects (already enabled by default)
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- RLS policies for storage bucket
-- Users can only upload to their own folder: user_id/filename
CREATE POLICY "Users can upload own ID documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'id-documents' 
  AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub')
);

-- Users can read their own documents
CREATE POLICY "Users can read own ID documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'id-documents' 
  AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub')
);

-- Users can delete their own documents
CREATE POLICY "Users can delete own ID documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'id-documents' 
  AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub')
);

-- Service role has full access
CREATE POLICY "Service role full access to ID documents"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'id-documents')
WITH CHECK (bucket_id = 'id-documents');
