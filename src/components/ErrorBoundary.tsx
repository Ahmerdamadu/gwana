import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  // FIX: Initialize state as a class property. This resolves errors where TypeScript
  // was unable to find the 'state' property on the component instance, which also
  // caused cascading type errors in components that use ErrorBoundary.
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // A simple fallback UI with a reload button.
      return (
         <div className="flex items-center justify-center h-screen bg-[var(--bg-primary)] text-white p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-400">Something went wrong.</h1>
            <p className="text-gray-400 mt-2">Please refresh the page to continue.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-5 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
