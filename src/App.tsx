import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { SupabaseTest } from './components/SupabaseTest';
import { ScraperForm } from './components/ScraperForm';
import { ScrapedDataTable } from './components/ScrapedDataTable';
import { JsonPanel } from './components/JsonPanel';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { CheckEmailPage } from './components/auth/CheckEmailPage';
import { ConfirmPage } from './components/auth/ConfirmPage';
import { ErrorMessage } from './components/ErrorMessage';
import { ScrapedData } from './types/scraper';
import { scrapeWebsite, mockScrapedData } from './utils/scraper';

function App() {
  const [scrapedData, setScrapedData] = useState<ScrapedData[]>(mockScrapedData);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newData = await scrapeWebsite(url);
      setScrapedData(prev => [newData, ...prev]);
      setSelectedId(newData.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scrape website');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const selectedData = scrapedData.find(item => item.id === selectedId) || null;

  const handleDismissError = () => {
    setError(null);
  };

  const ScraperPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Website Content Scraper
          </h1>
          <p className="text-gray-600">
            Extract and analyze content from any website including headings, links, and metadata
          </p>
        </div>

        {error && (
          <ErrorMessage message={error} onDismiss={handleDismissError} />
        )}

        <SupabaseTest />

        <ScraperForm onScrape={handleScrape} isLoading={isLoading} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ScrapedDataTable
              data={scrapedData}
              selectedId={selectedId}
              onSelectRow={handleSelectRow}
            />
          </div>
          
          <div className="lg:col-span-1">
            <JsonPanel selectedData={selectedData} />
          </div>
        </div>
      </main>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScraperPage />} />
        <Route path="/auth/login" element={<LoginPage onBack={() => {}} />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/auth/check-email" element={<CheckEmailPage />} />
        <Route path="/auth/confirm" element={<ConfirmPage />} />
      </Routes>
    </Router>
  );
}

export default App;