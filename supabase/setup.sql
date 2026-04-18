-- Run this once in your Supabase SQL Editor
-- supabase.com → your project → SQL Editor → paste & run

-- 1. Visitor count table
CREATE TABLE IF NOT EXISTS visitor_count (
  id         TEXT PRIMARY KEY DEFAULT 'portfolio',
  count      BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Seed row
INSERT INTO visitor_count (id, count)
  VALUES ('portfolio', 0)
  ON CONFLICT (id) DO NOTHING;

-- 3. Atomic increment function (avoids race conditions)
CREATE OR REPLACE FUNCTION increment_visitor(row_id TEXT)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE visitor_count
  SET count = count + 1, updated_at = now()
  WHERE id = row_id;
END;
$$;

-- 4. Allow anon role to read + call (RLS off for simplicity; enable if needed)
GRANT SELECT ON visitor_count TO anon;
GRANT EXECUTE ON FUNCTION increment_visitor(TEXT) TO anon;
