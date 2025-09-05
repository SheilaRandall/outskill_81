import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Globe className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-semibold text-gray-900">
            Website Scraper
          </span>
        </div>
        
        <Link
          to="/auth/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign in free
        </Link>
      </div>
    </nav>
  );
}