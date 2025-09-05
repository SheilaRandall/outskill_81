import React from 'react';
import { ExternalLink, Calendar, Hash, Link } from 'lucide-react';
import { ScrapedData } from '../types/scraper';

interface ScrapedDataTableProps {
  data: ScrapedData[];
  selectedId: string | null;
  onSelectRow: (id: string) => void;
}

export function ScrapedDataTable({ data, selectedId, onSelectRow }: ScrapedDataTableProps) {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString();
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No scraped data yet. Enter a URL above to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <Hash className="h-3 w-3" />
                  <span>Headings</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <Link className="h-3 w-3" />
                  <span>Links</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Scraped At</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectRow(item.id)}
                className={`cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-100 ${
                  selectedId === item.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectRow(item.id);
                  }
                }}
                role="button"
                aria-label={`Select scraped data for ${item.title}`}
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                    {item.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <ExternalLink className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-blue-600 truncate max-w-xs">
                      {item.url}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-gray-900">
                    {item.headingsCount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-gray-900">
                    {item.linksCount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">
                    {formatDate(item.scrapedAt)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}