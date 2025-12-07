"use client";
import React from 'react';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './ErrorBoundary';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      {children}
      <ToastContainer position="top-right" pauseOnHover theme="colored" />
    </ErrorBoundary>
  );
}
