import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Globe, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export function ConfirmPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');

        if (!token_hash || type !== 'email') {
          setStatus('error');
          setMessage('Invalid confirmation link. Please try signing up again.');
          return;
        }

        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: 'email'
        });

        if (error) {
          setStatus('error');
          setMessage('Failed to confirm email. The link may have expired.');
        } else {
          setStatus('success');
          setMessage('Your email has been confirmed successfully!');
        }
      } catch (err) {
        setStatus('error');
        setMessage('An unexpected error occurred during confirmation.');
      }
    };

    handleEmailConfirmation();
  }, [searchParams]);

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              {status === 'loading' && (
                <div className="bg-blue-100 rounded-full p-3">
                  <Loader className="h-12 w-12 text-blue-600 animate-spin" />
                </div>
              )}
              {status === 'success' && (
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-100 rounded-full p-3">
                  <XCircle className="h-12 w-12 text-red-600" />
                </div>
              )}
            </div>
            
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {status === 'loading' && 'Confirming your email...'}
              {status === 'success' && 'Email confirmed!'}
              {status === 'error' && 'Confirmation failed'}
            </h2>
            
            <p className="mt-2 text-sm text-gray-600">
              {message}
            </p>
          </div>
          
          {status === 'success' && (
            <div className="space-y-4">
              <button
                onClick={handleContinue}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Continue to Website Scraper
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <Link
                to="/auth/signup"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Try signing up again
              </Link>
              
              <div className="text-center">
                <Link
                  to="/auth/login"
                  className="text-sm text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Already have an account? Sign in free
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}