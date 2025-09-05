/*
  # Create scrape results table

  1. New Tables
    - `scrape_results`
      - `id` (uuid, primary key) - Unique identifier for each scrape result
      - `user_id` (uuid) - References the authenticated user who performed the scrape
      - `url` (text) - The URL that was scraped
      - `title` (text) - Page title extracted from the scraped content
      - `headings` (text[]) - Array of headings found on the page
      - `links` (text[]) - Array of links found on the page
      - `summary` (text) - Optional summary of the scraped content
      - `raw` (jsonb) - Complete raw scraped data in JSON format
      - `scraped_at` (timestamptz) - Timestamp when the scraping occurred

  2. Security
    - Enable RLS on `scrape_results` table
    - Add policy for authenticated users to read their own scrape results
    - Add policy for authenticated users to insert their own scrape results
*/

CREATE TABLE IF NOT EXISTS public.scrape_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  url text NOT NULL,
  title text,
  headings text[] DEFAULT '{}',
  links text[] DEFAULT '{}',
  summary text,
  raw jsonb,
  scraped_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.scrape_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read own rows" 
  ON public.scrape_results 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "insert own rows" 
  ON public.scrape_results 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);