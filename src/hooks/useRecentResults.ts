import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { ScrapedData } from '../types/scraper';

interface UseRecentResultsReturn {
  data: ScrapedData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useRecentResults(limit: number = 20): UseRecentResultsReturn {
  const [data, setData] = useState<ScrapedData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async () => {
    if (!supabase) {
      setError('Supabase client not configured');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data: results, error: fetchError } = await supabase
        .from('scrape_results')
        .select('*')
        .order('scraped_at', { ascending: false })
        .limit(limit);

      if (fetchError) {
        throw fetchError;
      }

      // Transform database results to match ScrapedData interface
      const transformedData: ScrapedData[] = (results || []).map(result => ({
        id: result.id,
        title: result.title || 'Untitled',
        url: result.url,
        headingsCount: result.headings?.length || 0,
        linksCount: result.links?.length || 0,
        scrapedAt: result.scraped_at,
        rawData: {
          title: result.title || 'Untitled',
          headings: result.headings || [],
          links: (result.links || []).map((link: string) => ({ text: link, href: link })),
          meta: {
            description: result.summary || undefined,
            keywords: undefined
          }
        }
      }));

      setData(transformedData);
    } catch (err) {
      console.error('Error fetching recent results:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [limit]);

  return {
    data,
    loading,
    error,
    refetch: fetchResults
  };
}