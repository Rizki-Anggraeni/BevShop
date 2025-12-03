"use client";
import React from 'react';
import { toast } from 'react-toastify';

type Props = { children: React.ReactNode };

export default class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    // Log to console and show a toast to the user
    // In future this could send to an error tracking service
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, info);
    try {
      toast.error('Something went wrong. Please refresh the page.');
    } catch (e) {
      // ignore toast failures
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-gray-500 mb-4">An unexpected error occurred. Try refreshing the page.</p>
            <button
              className="bg-primary text-white px-4 py-2 rounded"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
