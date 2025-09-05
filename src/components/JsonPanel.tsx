import React from 'react';
import { FileText, Copy, Check } from 'lucide-react';
import { ScrapedData } from '../types/scraper';

interface JsonPanelProps {
  selectedData: ScrapedData | null;
}

export function JsonPanel({ selectedData }: JsonPanelProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (selectedData) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(selectedData.rawData, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  if (!selectedData) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Select a row from the table to view raw JSON data</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between bg-gray-50">
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-900">Raw JSON Data</h3>
        </div>
        
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      <div className="p-4 max-h-96 overflow-y-auto">
        <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words font-mono leading-relaxed">
          {JSON.stringify(selectedData.rawData, null, 2)}
        </pre>
      </div>
    </div>
  );
}