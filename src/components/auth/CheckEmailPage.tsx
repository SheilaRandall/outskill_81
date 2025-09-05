import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, RefreshCw, Globe } from 'lucide-react';

export function CheckEmailPage() {
  const location = useLocation();
  const email = location.state?.email || '';
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const handleResendEmail = async () => {
    if (!email) {
      setResendMessage('Email address not found. Please try signing up again.');
      return;
    }

    setIsResending(true);
    setResendMessage('');

    try {
      // Mock resend functionality
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendMessage('Verification email sent! Check your inbox.');
    } catch (err) {
      setResendMessage('An error occurred. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/auth/signup"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Sign Up</span>
          </Link>
          
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
              <div className="bg-blue-100 rounded-full p-3">
                <Mail className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Check your inbox
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a verification email to{' '}
              <span className="font-medium text-gray-900">{email}</span>
            </p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <div className="text-sm text-gray-600 space-y-2">
              <p>To complete your account setup:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Check your email inbox</li>
                <li>Click the verification link in the email</li>
                <li>You'll be redirected back to continue</li>
              </ol>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500 mb-3">
                Don't see the email? Check your spam folder or request a new one.
              </p>
              
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full flex justify-center items-center space-x-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    <span>Resend verification email</span>
                  </>
                )}
              </button>

              {resendMessage && (
                <p className={`mt-2 text-xs ${
                  resendMessage.includes('sent') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {resendMessage}
                </p>
              )}
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/auth/login"
              className="text-sm text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              Already verified? Sign in free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}