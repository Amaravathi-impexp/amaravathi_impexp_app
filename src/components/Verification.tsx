import { Mail, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';
import { SimpleFooter } from './SimpleFooter';
import { TopRibbon } from './TopRibbon';

interface VerificationProps {
  onClose: () => void;
  onSwitchToSignIn: () => void;
  email: string;
}

export function Verification({ onClose, onSwitchToSignIn, email }: VerificationProps) {
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleResend = async () => {
    setResending(true);
    setResendSuccess(false);
    
    // Simulate API call
    setTimeout(() => {
      setResending(false);
      setResendSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setResendSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopRibbon />
      <header className="bg-white shadow-sm sticky top-10 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <button onClick={onClose} className="hover:opacity-80 transition-opacity">
              <Logo className="h-[86px]" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-center text-2xl mb-4 text-gray-900">
              Account Created Successfully!
            </h2>

            {/* Main Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="mb-2">
                    A verification link has been sent to{' '}
                    <span className="font-medium">{email}</span>
                  </p>
                  <p>Please check your email and click on the verification link to activate your account.</p>
                </div>
              </div>
            </div>

            {/* Resend Success Message */}
            {resendSuccess && (
              <div className="rounded-md bg-green-50 border border-green-200 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-800">Verification email resent successfully!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Resend Section */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-3">
                Didn't receive the email?
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-blue-600 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resending ? 'Resending...' : 'Click here to resend'}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={onSwitchToSignIn}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go to Sign In
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Please check your spam folder if you don't see the email in your inbox.
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
      <SimpleFooter />
    </div>
  );
}