import React, { useState } from 'react';
import { Globe, Loader } from 'lucide-react';

interface ScraperFormProps {
  onScrape: (url: string) => void;
  isLoading: boolean;
}

export function ScraperForm({ onScrape, isLoading }: ScraperFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onScrape(url.trim());
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Globe className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Scrape Website Content</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="url" className="sr-only">
            Website URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., https://example.com)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              <span>Scraping...</span>
            </>
          ) : (
            <span>Scrape</span>
          )}
        </button>
      </form>
    </div>
  );
}