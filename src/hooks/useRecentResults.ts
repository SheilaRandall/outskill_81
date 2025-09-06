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
    try {
      setLoading(true);
      setError(null);

      // If Supabase is not configured, return empty results
      if (!supabase) {
        setData([]);
        setLoading(false);
        return;
      }

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
      // Silently handle Supabase connection errors and return empty results
      console.warn('Supabase not available, using local data only');
      setData([]);
      setError(null);
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