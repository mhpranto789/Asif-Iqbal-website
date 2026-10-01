import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in UI:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080E15] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4">
            <h1 className="text-3xl font-bold font-serif text-teal-300">Asif Iqbal</h1>
            <p className="text-slate-400 text-sm">
              We encountered a brief rendering issue. Please reload to resume your experience.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = '/';
              }}
              className="px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reload Homepage
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
