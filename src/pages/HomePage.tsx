import React from 'react';
import { Shield, Lock, Key, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">SecureVault</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onGetStarted}
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={onGetStarted}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Secure Your Digital Life with
              <span className="text-blue-500"> SecureVault</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Your trusted password manager that keeps your online accounts safe and accessible. Military-grade encryption meets user-friendly design.
            </p>
            <Button
              size="lg"
              onClick={onGetStarted}
              rightIcon={<ArrowRight size={20} />}
            >
              Start Securing Your Passwords
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Bank-Level Security</h3>
              <p className="text-gray-400">
                Your data is protected with AES-256 encryption, the same standard used by financial institutions.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Key className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Password Generator</h3>
              <p className="text-gray-400">
                Create strong, unique passwords with our advanced generator. Never use weak passwords again.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Cross-Platform Access</h3>
              <p className="text-gray-400">
                Access your passwords securely from any device, anytime, anywhere. Always stay in sync.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-500/10 rounded-2xl p-8 sm:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to secure your passwords?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of users who trust SecureVault with their digital security.
              </p>
              <Button
                size="lg"
                onClick={onGetStarted}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Shield className="h-6 w-6 text-blue-500" />
            <span className="ml-2 text-lg font-semibold text-white">SecureVault</span>
          </div>
          <p className="mt-4 text-center text-gray-400">
            © {new Date().getFullYear()} SecureVault. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;