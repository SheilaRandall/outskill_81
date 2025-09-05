import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Test 1: Basic connection
      const { data, error } = await supabase.from('scrape_results').select('count', { count: 'exact', head: true });
      
      if (error) {
        setConnectionStatus('error');
        setErrorMessage(`Database connection failed: ${error.message}`);
        return;
      }

      // Test 2: Auth configuration
      const { data: authData, error: authError } = await supabase.auth.getSession();
      
      setConnectionStatus('success');
      setDetails({
        databaseConnected: true,
        authConfigured: !authError,
        tableExists: data !== null,
        currentUrl: window.location.origin
      });

    } catch (err) {
      setConnectionStatus('error');
      setErrorMessage(`Connection test failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        {connectionStatus === 'testing' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
        {connectionStatus === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
        {connectionStatus === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
        <span>Supabase Connection Test</span>
      </h3>

      {connectionStatus === 'testing' && (
        <p className="text-gray-600">Testing connection to Supabase...</p>
      )}

      {connectionStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm">{errorMessage}</p>
          <button 
            onClick={testConnection}
            className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
          >
            Retry Test
          </button>
        </div>
      )}

      {connectionStatus === 'success' && details && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-green-700 text-sm mb-2">✅ Supabase connection successful!</p>
          <div className="text-xs text-green-600 space-y-1">
            <p>• Database: {details.databaseConnected ? 'Connected' : 'Failed'}</p>
            <p>• Auth: {details.authConfigured ? 'Configured' : 'Failed'}</p>
            <p>• Table: {details.tableExists ? 'Exists' : 'Missing'}</p>
            <p>• Current URL: {details.currentUrl}</p>
          </div>
        </div>
      )}
    </div>
  );
}